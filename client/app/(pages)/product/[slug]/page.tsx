import AddToCartButton from "@/app/components/common/AddToCartButton";
import FormattedPrice from "@/app/components/common/FormattedPrice";
import Container from "@/app/components/Container";
import BaseURL from "@/app/constants/BaseURL";
import axios from "axios";
import Image from "next/image";
import { VscInbox } from "react-icons/vsc";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const ProductPage = async ({ params }: Props) => {
  // Await params to resolve them before accessing 'slug'
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  try {
    const res = await axios.get(`${BaseURL}/watches/${slug}`);

    return (
      <Container className="min-h-screen my-10 bg-whiteSmoke dark:bg-gray-600/10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 p-4">
          <div className="h-full xl:col-span-2">
            <Image
              src={res.data.pictureUrl}
              width={500}
              height={500}
              alt={res.data.brand}
              className="w-full h-full object-contain"
              priority
            />
          </div>

          <div className="w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <div className="flex flex-col gap-5">
              <p className="text-4xl font-semibold">{res.data.brand}</p>
              <p className="text-xl font-semibold">Model: {res.data.model}</p>
              <FormattedPrice
                amount={res.data.price}
                className="text-lg font-bold"
              />
            </div>

            <p className="tracking-wide text-gray-600 dark:text-gray-400 mt-5">
              {res.data.description}
            </p>

            <AddToCartButton item={res.data} className="rounded-md py-3" />
          </div>
        </div>
      </Container>
    );
  } catch (error) {
    return (
      <Container className="min-h-screen flex flex-col items-center justify-center gap-3">
        <span>
          <VscInbox size={30} />
        </span>

        <p className="text-3xl font-semibold">Product not found</p>
      </Container>
    );
  }
};

export default ProductPage;
