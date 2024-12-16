import Image from "next/image";
import Link from "next/link";
import FormattedPrice from "./common/FormattedPrice";
import AddToCartButton from "./common/AddToCartButton";

interface contentItem {
  brand: string;
  model: string;
  description: string;
  pictureUrl: string;
  price: number;
  reference: number;
}

const ProductCard = ({
  item,
  priority,
  adminProductPageUrl = false,
  showAddToCart = false,
}: {
  item: contentItem;
  priority?: boolean;
  adminProductPageUrl?: boolean;
  showAddToCart?: boolean;
}) => {
  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-md relative group overflow-hidden">
      <div className="overflow-hidden mb-3">
        <Link
          href={
            adminProductPageUrl
              ? `/admin/product/${item.reference}`
              : `/product/${item.reference}`
          }
        >
          <Image
            src={item.pictureUrl}
            width={500}
            height={500}
            unoptimized
            priority={priority ? true : undefined}
            alt={item.reference + item.brand}
            className="w-full h-72 object-cover group-hover:scale-105 transition-all duration-200"
          />
        </Link>
      </div>

      <div className="px-6 flex flex-col items-center gap-2">
        <p className="uppercase text-xs font-medium text-yellow-500">
          {item.brand}
        </p>
        <p className="uppercase text-xs font-medium">Model: {item.model}</p>
        <p className="text-center text-xs line-clamp-1">{item.description}</p>

        <FormattedPrice amount={item.price} className="mb-5 opacity-70" />
      </div>
      {showAddToCart && <AddToCartButton item={item} />}
    </div>
  );
};

export default ProductCard;
