const fs = require('fs');
const path = require('path');
const https = require('https');

async function downloadImages() {
  const pages = [
    'https://dulipu.en.made-in-china.com/product-group/zvjaULdCSZIV/Interlock-Sewing-Machine-catalog-1.html',
    'https://dulipu.en.made-in-china.com/product-group/zvjaULdCSZIV/Interlock-Sewing-Machine-catalog-2.html',
    'https://dulipu.en.made-in-china.com/product-group/zvjaULdCSZIV/Interlock-Sewing-Machine-catalog-3.html',
    'https://dulipu.en.made-in-china.com/product/keywordSearch?username=&pageNumber=8&pageSize=24&viewType=1&isByGroup=&pageUrlFrom=1&productGroupOrCatId=&searchKeyword=ewing+Machine&searchKeywordSide=&searchKeywordList=&selectedFeaturedType=&selectedSpotlightId=&viewPageSize=24&pbv_id=1k0q93b92dba&bv_id=1k0q93h0q298'
  ];

  const destDir = path.join(__dirname, 'public', 'images', 'machines');
  
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  let productsMap = new Map();

  for (let i = 0; i < pages.length; i++) {
    console.log(`Fetching page ${i + 1}...`);
    try {
      const res = await fetch(pages[i], {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
      });
      const html = await res.text();
      
      const imgRegex = /<img [^>]*data-original=["'](\/\/image\.made-in-china\.com\/[^"']*\.(?:jpg|jpeg|png|webp))["'][^>]*alt=["']([^"']+)["']/gi;
      const matches = [...html.matchAll(imgRegex)];
      
      matches.forEach(m => {
        const url = 'https:' + m[1];
        const title = m[2];
        if (!productsMap.has(url)) {
          productsMap.set(url, title);
        }
      });
    } catch (err) {
      console.error(`Error fetching page ${i + 1}:`, err);
    }
  }

  const uniqueProducts = Array.from(productsMap.entries());
  console.log(`Found ${uniqueProducts.length} unique products across all pages.`);
  
  const productsData = [];

  for (let i = 0; i < uniqueProducts.length; i++) {
    const [originalUrl, title] = uniqueProducts[i];
    // Replace size modifier for High Quality
    let hqUrl = originalUrl.replace('/2f0j00/', '/4f0j00/');
    
    // We save them as .webp
    const fileName = `interlock_machine_${i + 1}.webp`;
    const destPath = path.join(destDir, fileName);
    const localSrc = `/images/machines/${fileName}`;
    
    productsData.push({
      src: localSrc,
      title: title,
      sku: `MM_INT_${(i + 1).toString().padStart(3, '0')}` // Generate a sequential SKU
    });

    console.log(`[${i + 1}/${uniqueProducts.length}] Downloading ${fileName}...`);
    await downloadFile(hqUrl, destPath).catch(err => {
      console.log(`HQ failed, falling back to original quality for ${fileName}...`);
      return downloadFile(originalUrl, destPath);
    }).catch(err => {
       console.log(`Failed completely for ${fileName}:`, err.message);
    });
  }
  
  // Write the mapping to products.json
  const jsonPath = path.join(destDir, 'products.json');
  fs.writeFileSync(jsonPath, JSON.stringify(productsData, null, 2));
  console.log(`Successfully updated ${jsonPath} with ${productsData.length} products!`);
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    // Include Accept: image/webp to force the CDN to serve WebP
    https.get(url, { headers: { 
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8'
    } }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Status code ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

downloadImages();
