import React from 'react';
import Image from 'next/image';

const merchandise = {
  title: "Cool merch.",
  subtitle: "No strings attached.",
  tagline: "Just drop by!",
  products: [
    { name: "Hoodie", placeholder: "hoodie.png" },
    { name: "T-shirt", placeholder: "t-shirt.png" },
    { name: "Bag", placeholder: "bag.png" },
    { name: "Cap", placeholder: "cap.png" }
  ]
}

interface Product {
  name: string;
  placeholder: string;
}

interface MerchandiseSectionProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
  products?: Product[];
}

const MerchandiseSection: React.FC<MerchandiseSectionProps> = ({
  title = merchandise.title,
  subtitle = merchandise.subtitle,
  tagline = merchandise.tagline,
  products = merchandise.products,
}) => {
  return (
    <div className="py-10 px-8 border-t border-dashed border-signoz_slate-500">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-start">
          <h2 className="mb-0">{title}</h2>
          <h2 className="mb-0">{subtitle}</h2>
          <h2 className="mb-0">{tagline}</h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          {products.map((product, index) => (
              <Image
                key={index}
                src={`/img/events/kubecon-2025/${product.placeholder}`}
                alt={product.name}
                width={180}
                height={180}
                className="object-contain rounded-sm"
              />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MerchandiseSection;