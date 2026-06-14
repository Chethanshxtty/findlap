import type { AIResponse, Laptop, Specs, Store } from './types';

// Helper to format currency
const formatINR = (num: number) => {
  return '₹' + num.toLocaleString('en-IN');
};

export function generateMockLaptops(budget: number, useCases: string[]): AIResponse {
  let laptopTemplates: Array<{
    name: string;
    brand: string;
    basePrice: number;
    specs: Specs;
    useTags: Array<'coding' | 'gaming' | 'editing'>;
    whyBestReason: string;
    imageQuery: string;
  }> = [];

  // Enforce new budget limit
  const targetBudget = Math.max(budget, 35000);

  if (targetBudget < 50000) {
    laptopTemplates = [
      {
        name: "Aspire Lite 15",
        brand: "Acer",
        basePrice: Math.min(targetBudget - 1200, 39990),
        specs: {
          Processor: "Intel Core i3-1215U (6 Cores, up to 4.4 GHz)",
          RAM: "8GB DDR4 RAM (Expandable to 16GB)",
          Storage: "512GB PCIe Gen3 NVMe SSD",
          GPU: "Intel UHD Graphics",
          Display: "15.6\" FHD (1920x1080) Anti-glare Display"
        },
        useTags: ["coding"],
        whyBestReason: "Offers the best performance-to-price ratio in the budget tier with a decent 12th Gen Intel Core i3 processor and ample SSD storage.",
        imageQuery: "Acer Aspire laptop"
      },
      {
        name: "IdeaPad Slim 1",
        brand: "Lenovo",
        basePrice: Math.min(targetBudget - 2200, 38490),
        specs: {
          Processor: "AMD Ryzen 3 7320U (4 Cores, up to 4.1 GHz)",
          RAM: "8GB LPDDR5 RAM (Soldered)",
          Storage: "512GB PCIe Gen4 NVMe SSD",
          GPU: "AMD Radeon 610M Graphics",
          Display: "15.6\" FHD (1920x1080) TN 220nits Anti-glare"
        },
        useTags: ["coding"],
        whyBestReason: "Equipped with power-efficient Ryzen 7000 series chip and faster LPDDR5 RAM, maximizing battery life for daily work.",
        imageQuery: "Lenovo IdeaPad laptop"
      },
      {
        name: "Vivobook Go 15",
        brand: "Asus",
        basePrice: Math.min(targetBudget - 3000, 36990),
        specs: {
          Processor: "Intel Core i3-1215U (6 Cores, up to 4.4 GHz)",
          RAM: "8GB DDR4 RAM",
          Storage: "512GB M.2 NVMe PCIe 3.0 SSD",
          GPU: "Intel UHD Graphics",
          Display: "15.6\" FHD (1920x1080) 16:9 Aspect Ratio"
        },
        useTags: ["coding"],
        whyBestReason: "Ultra-budget friendly device providing standard FHD visual estate for coding and lightweight documentation.",
        imageQuery: "Asus Vivobook laptop"
      },
      {
        name: "Infinix Y1 Plus",
        brand: "Infinix",
        basePrice: Math.min(targetBudget - 4000, 35990),
        specs: {
          Processor: "Intel Core i3-1005G1 (2 Cores, up to 3.4 GHz)",
          RAM: "8GB LPDDR4X RAM",
          Storage: "512GB NVMe PCIe SSD",
          GPU: "Intel UHD Graphics",
          Display: "15.6\" FHD 100% sRGB Color Gamut Screen"
        },
        useTags: ["coding", "editing"],
        whyBestReason: "An entry-level option that stands out with its high-quality 100% sRGB display, suitable for basic photo editing.",
        imageQuery: "Infinix laptop"
      },
      {
        name: "Inspiron 3520",
        brand: "Dell",
        basePrice: Math.min(targetBudget - 500, 42990),
        specs: {
          Processor: "Intel Core i3-1115G4 (2 Cores, up to 4.1 GHz)",
          RAM: "8GB DDR4 RAM",
          Storage: "512GB SSD PCIe NVMe",
          GPU: "Intel UHD Graphics",
          Display: "15.6\" FHD (1920x1080) WVA Display"
        },
        useTags: ["coding"],
        whyBestReason: "Reliable and robust choice for entry-level programming tasks with Dell's signature build quality.",
        imageQuery: "Dell Inspiron laptop"
      }
    ];
  } else if (targetBudget < 70000) {
    laptopTemplates = [
      {
        name: "IdeaPad Slim 3",
        brand: "Lenovo",
        basePrice: Math.min(targetBudget - 1500, 48990),
        specs: {
          Processor: "AMD Ryzen 5 7520U (4 Cores / 8 Threads, up to 4.3 GHz)",
          RAM: "16GB LPDDR5 RAM",
          Storage: "512GB SSD M.2 PCIe NVMe",
          GPU: "AMD Radeon 610M Integrated",
          Display: "15.6\" FHD (1920x1080) IPS 300nits Anti-glare"
        },
        useTags: ["coding", "editing"],
        whyBestReason: "Fitted with 16GB dual-channel LPDDR5 memory and a reliable Ryzen 5 CPU, making multitasking and compile times highly efficient.",
        imageQuery: "Lenovo IdeaPad laptop"
      },
      {
        name: "Vivobook 15",
        brand: "Asus",
        basePrice: Math.min(targetBudget - 3500, 51990),
        specs: {
          Processor: "Intel Core i5-12500H (12 Cores, up to 4.5 GHz)",
          RAM: "16GB DDR4 RAM",
          Storage: "512GB M.2 NVMe PCIe 4.0 SSD",
          GPU: "Intel Iris Xe Graphics",
          Display: "15.6\" FHD (1920x1080) 60Hz Display"
        },
        useTags: ["coding", "editing"],
        whyBestReason: "A powerful 12th-gen H-series performance processor that provides massive computational power for software projects and editing.",
        imageQuery: "Asus Vivobook laptop"
      },
      {
        name: "Victus 15 AMD",
        brand: "HP",
        basePrice: Math.min(targetBudget - 500, 58990),
        specs: {
          Processor: "AMD Ryzen 5 5600H (6 Cores / 12 Threads, up to 4.2 GHz)",
          RAM: "8GB DDR4 RAM (Upgrade recommended)",
          Storage: "512GB PCIe NVMe M.2 SSD",
          GPU: "NVIDIA GeForce GTX 1650 (4GB GDDR6)",
          Display: "15.6\" FHD (1920x1080) 144Hz IPS Panel"
        },
        useTags: ["gaming", "coding", "editing"],
        whyBestReason: "The cheapest gateway to true discrete graphics and high refresh rate gaming, catering perfectly to all three workloads under ₹60K.",
        imageQuery: "HP Victus laptop"
      },
      {
        name: "Inspiron 3530",
        brand: "Dell",
        basePrice: Math.min(targetBudget - 4000, 54490),
        specs: {
          Processor: "Intel Core i5-1335U (10 Cores, up to 4.6 GHz)",
          RAM: "8GB DDR4 RAM",
          Storage: "512GB SSD PCIe NVMe",
          GPU: "Intel UHD Graphics",
          Display: "15.6\" FHD (1920x1080) 120Hz WVA Display"
        },
        useTags: ["coding"],
        whyBestReason: "Features a modern 13th Gen Intel chip and a smooth 120Hz fluid screen in a highly durable, professional package.",
        imageQuery: "Dell Inspiron laptop"
      },
      {
        name: "Aspire 5",
        brand: "Acer",
        basePrice: Math.min(targetBudget - 5000, 46990),
        specs: {
          Processor: "Intel Core i5-1235U (10 Cores, up to 4.4 GHz)",
          RAM: "8GB DDR4 RAM",
          Storage: "512GB SSD NVMe PCIe",
          GPU: "Intel Iris Xe Graphics",
          Display: "15.6\" FHD IPS Narrow Bezel Screen"
        },
        useTags: ["coding", "editing"],
        whyBestReason: "Solid everyday companion with premium aluminum top cover and Iris Xe graphics capabilities for casual photo touchups.",
        imageQuery: "Acer Aspire laptop"
      }
    ];
  } else if (targetBudget < 95000) {
    laptopTemplates = [
      {
        name: "TUF Gaming F15",
        brand: "Asus",
        basePrice: Math.min(targetBudget - 1500, 74990),
        specs: {
          Processor: "Intel Core i5-12500H (12 Cores, up to 4.5 GHz)",
          RAM: "16GB DDR4 Dual-Channel RAM",
          Storage: "512GB PCIe Gen4 NVMe M.2 SSD",
          GPU: "NVIDIA GeForce RTX 3050 (4GB GDDR6, 95W TGP)",
          Display: "15.6\" FHD (1920x1080) 144Hz IPS Level G-Sync"
        },
        useTags: ["gaming", "coding", "editing"],
        whyBestReason: "An ultimate all-rounder containing high-power H-series cores and a dedicated RTX GPU with ray tracing for modern workloads.",
        imageQuery: "Asus TUF laptop"
      },
      {
        name: "Victus 16",
        brand: "HP",
        basePrice: Math.min(targetBudget - 1000, 81990),
        specs: {
          Processor: "AMD Ryzen 7 7840HS (8 Cores / 16 Threads, up to 5.1 GHz)",
          RAM: "16GB DDR5 5600MHz RAM",
          Storage: "512GB Gen4 NVMe M.2 SSD",
          GPU: "NVIDIA GeForce RTX 4050 (6GB GDDR6, 120W TGP)",
          Display: "16.1\" FHD (1920x1080) 144Hz IPS 250 nits Display"
        },
        useTags: ["gaming", "coding", "editing"],
        whyBestReason: "Boasts a highly advanced AMD Zen 4 processor paired with a next-gen RTX 4050 GPU, yielding outstanding computational and render speeds.",
        imageQuery: "HP Victus laptop"
      },
      {
        name: "MacBook Air M2",
        brand: "Apple",
        basePrice: Math.min(targetBudget - 2000, 89900),
        specs: {
          Processor: "Apple M2 Chip (8-core CPU / 8-core GPU)",
          RAM: "8GB Unified Memory",
          Storage: "256GB Superfast SSD",
          GPU: "Integrated 8-core Apple GPU",
          Display: "13.6\" Liquid Retina Display with True Tone"
        },
        useTags: ["coding", "editing"],
        whyBestReason: "Industry leading battery efficiency (up to 18 hours), quiet fanless thermals, and an incredibly premium Retina panel.",
        imageQuery: "MacBook Air laptop"
      },
      {
        name: "IdeaPad Gaming 3",
        brand: "Lenovo",
        basePrice: Math.min(targetBudget - 5000, 67990),
        specs: {
          Processor: "AMD Ryzen 5 6600H (6 Cores / 12 Threads, up to 4.5 GHz)",
          RAM: "16GB DDR5 RAM",
          Storage: "512GB PCIe Gen4 M.2 SSD",
          GPU: "NVIDIA GeForce RTX 3050 (4GB GDDR6, 85W TGP)",
          Display: "15.6\" FHD (1920x1080) IPS 120Hz Screen"
        },
        useTags: ["gaming", "coding"],
        whyBestReason: "Provides high-frequency DDR5 memory, excellent thermal layout, and reliable gaming performance at an entry gaming price.",
        imageQuery: "Lenovo Gaming laptop"
      },
      {
        name: "Nitro V 15",
        brand: "Acer",
        basePrice: Math.min(targetBudget - 3000, 77990),
        specs: {
          Processor: "Intel Core i5-13420H (8 Cores, up to 4.6 GHz)",
          RAM: "16GB DDR5 RAM",
          Storage: "512GB PCIe Gen4 NVMe SSD",
          GPU: "NVIDIA GeForce RTX 4050 (6GB GDDR6)",
          Display: "15.6\" FHD IPS 144Hz ComfyView Display"
        },
        useTags: ["gaming", "coding", "editing"],
        whyBestReason: "A modern machine packing a 13th-gen Intel Core i5 and a discrete RTX 4050 card inside a sleek, stealthy dark chassis.",
        imageQuery: "Acer Nitro laptop"
      }
    ];
  } else {
    // Premium tier (Budget >= 95000)
    laptopTemplates = [
      {
        name: "Predator Helios Neo 16",
        brand: "Acer",
        basePrice: Math.min(targetBudget - 5000, 119990),
        specs: {
          Processor: "Intel Core i7-13700HX (16 Cores / 24 Threads, up to 5.0 GHz)",
          RAM: "16GB DDR5 4800MHz (Dual Channel)",
          Storage: "1TB PCIe Gen4 NVMe M.2 SSD",
          GPU: "NVIDIA GeForce RTX 4060 (8GB GDDR6, 140W TGP)",
          Display: "16\" WQXGA (2560x1600) IPS 165Hz sRGB 100%"
        },
        useTags: ["gaming", "coding", "editing"],
        whyBestReason: "A brute-force desktop replacement packing a desktop-grade HX processor, a fully powered 140W RTX 4060, and a stunning 2K screen.",
        imageQuery: "Acer Predator laptop"
      },
      {
        name: "Legion Pro 5i",
        brand: "Lenovo",
        basePrice: Math.min(targetBudget - 2000, 139990),
        specs: {
          Processor: "Intel Core i7-14700HX (20 Cores, up to 5.5 GHz)",
          RAM: "16GB DDR5 5600MHz RAM",
          Storage: "1TB PCIe Gen4 SSD",
          GPU: "NVIDIA GeForce RTX 4060 (8GB GDDR6, 140W TGP)",
          Display: "16\" WQXGA (2560x1600) IPS 240Hz 500 nits"
        },
        useTags: ["gaming", "coding", "editing"],
        whyBestReason: "The gold standard of premium performance laptops with its advanced Coldfront 5.0 cooling, a blindingly fast 240Hz panel, and massive specs.",
        imageQuery: "Lenovo Legion laptop"
      },
      {
        name: "ROG Zephyrus G16",
        brand: "Asus",
        basePrice: Math.min(targetBudget - 1000, 159990),
        specs: {
          Processor: "Intel Core Ultra 7 155H (16 Cores, AI NPU inside)",
          RAM: "16GB LPDDR5X (Dual Channel)",
          Storage: "1TB PCIe 4.0 NVMe SSD",
          GPU: "NVIDIA GeForce RTX 4060 (8GB GDDR6)",
          Display: "16\" ROG Nebula OLED QHD+ 240Hz 0.2ms Screen"
        },
        useTags: ["coding", "editing", "gaming"],
        whyBestReason: "Combines high performance with class-leading style and portability. Features a breath-taking OLED panel suited perfectly for color-grading editors.",
        imageQuery: "Asus ROG laptop"
      },
      {
        name: "MacBook Pro 14 M3 Pro",
        brand: "Apple",
        basePrice: Math.min(targetBudget - 4000, 204900),
        specs: {
          Processor: "Apple M3 Pro Chip (11-core CPU / 14-core GPU)",
          RAM: "18GB Unified Memory",
          Storage: "512GB Superfast SSD",
          GPU: "Integrated 14-core Apple GPU",
          Display: "14.2\" Liquid Retina XDR (120Hz ProMotion)"
        },
        useTags: ["coding", "editing"],
        whyBestReason: "Exceptional coding environment for Unix/iOS developers with the Liquid Retina XDR display offering unparalleled brightness and accuracy.",
        imageQuery: "MacBook Pro laptop"
      },
      {
        name: "Omen 16",
        brand: "HP",
        basePrice: Math.min(targetBudget - 8000, 114990),
        specs: {
          Processor: "Intel Core i7-13700HX (16 Cores, up to 5.0 GHz)",
          RAM: "16GB DDR5 RAM",
          Storage: "1TB PCIe SSD",
          GPU: "NVIDIA GeForce RTX 4050 (6GB GDDR6)",
          Display: "16.1\" FHD IPS 165Hz 3ms Display"
        },
        useTags: ["gaming", "coding"],
        whyBestReason: "Excellent structural build, stealthy professional dark look, and premium dual-fan cooling to sustain intensive workloads without thermal throttling.",
        imageQuery: "HP Omen laptop"
      }
    ];
  }

  // Adjust prices dynamically to fit within budget constraint, make sure no laptop exceeds the budget
  const laptops: Laptop[] = laptopTemplates.map((template, idx) => {
    let price = template.basePrice;
    if (price > targetBudget) {
      price = targetBudget - (idx * 1500) - 1000;
    }
    // Make sure we don't fall below ₹35,000
    if (price < 35000) {
      price = 35000 + (5 - idx) * 1000;
    }

    const brandFormatted = template.brand;
    const nameFormatted = template.name;
    const priceFormatted = formatINR(price);

    const stores: Store[] = [
      {
        name: "Amazon",
        price: formatINR(price),
        url: `https://www.amazon.in/s?k=${encodeURIComponent(template.brand + ' ' + template.name)}`
      },
      {
        name: "Flipkart",
        price: formatINR(price + Math.floor(Math.random() * 800) - 400),
        url: `https://www.flipkart.com/search?q=${encodeURIComponent(template.brand + ' ' + template.name)}`
      },
      {
        name: "Croma",
        price: formatINR(price + Math.floor(Math.random() * 1200) - 200),
        url: `https://www.croma.com/searchB?q=${encodeURIComponent(template.brand + ' ' + template.name)}`
      }
    ];

    return {
      rank: idx + 1,
      name: `${brandFormatted} ${nameFormatted}`,
      brand: brandFormatted,
      price: priceFormatted,
      useTags: template.useTags,
      specs: template.specs,
      imageQuery: template.imageQuery,
      stores: stores
    };
  });

  // Re-order recommendations slightly based on matching use cases.
  const scoredLaptops = laptops.map(laptop => {
    let score = 0;
    laptop.useTags.forEach(tag => {
      if (useCases.includes(tag)) {
        score += 2;
      }
    });
    score += (6 - laptop.rank) * 0.1;
    return { laptop, score };
  });

  scoredLaptops.sort((a, b) => b.score - a.score);

  const finalLaptops: Laptop[] = scoredLaptops.map((item, idx) => {
    return {
      ...item.laptop,
      rank: idx + 1
    };
  });

  const best = finalLaptops[0];
  const templateMatched = laptopTemplates.find(t => best.name.includes(t.name)) || laptopTemplates[0];

  const useCaseStr = useCases.join(', ');
  const summary = `Analyzed 56 retail options in the Indian laptop ecosystem for ${useCaseStr} workloads with a budget constraint of ${formatINR(targetBudget)}. Recommended 5 top-performing machines ranking from maximum value-to-spec density. The ${best.name} stands out as the optimal selection.`;

  return {
    summary: summary,
    totalFound: 24,
    bestPick: {
      name: best.name,
      brand: best.brand,
      price: best.price,
      specs: best.specs,
      whyBest: templateMatched.whyBestReason,
      imageQuery: best.imageQuery,
      stores: best.stores
    },
    laptops: finalLaptops
  };
}
