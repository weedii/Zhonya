import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/redux/CartSlice";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import FormattedPrice from "./common/FormattedPrice";
import { FaMinus, FaPlus } from "react-icons/fa";

const CartItem = ({ cart, item }: { cart: any; item: any }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item: any) => {
    dispatch(removeFromCart(item));
    toast.success(`${item.category} has been removed`);
  };

  const handleDecreaseQuantity = (item: any) => {
    dispatch(decreaseQuantity(item));
  };

  const handleIncreaseQuantity = (item: any) => {
    dispatch(increaseQuantity(item));
  };

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2 rounded-md">
      <div className="flex col-span-5 md:col-span-2 items-center gap-4 ml-4">
        <ImCross
          className="hover:text-red-700 cursor-pointer"
          onClick={() => handleRemoveFromCart(item)}
        />

        <Link href={`/product/${item.reference}`}>
          <Image
            src={item.pictureUrl}
            width={200}
            height={200}
            alt={item.brand}
            priority
            className="w-32 h-32 object-contain"
          />
        </Link>

        <h1 className="font-semibold">{item.brand + " " + item.model}</h1>
      </div>

      <div className="col-span-5 md:col-span-3 flex items-center justify-between py-4 md:py-0 px-4 md:px-0">
        <p className="flex w-1/3 items-center text-lg font-semibold">
          <FormattedPrice amount={item.price} />
        </p>

        <div className="w-1/3 flex items-center gap-6 text-lg">
          <button
            onClick={() => handleDecreaseQuantity(item)}
            disabled={item.quantity <= 1}
            className="w-6 h-6 hover:bg-yellow-500 cursor-pointer border hover:text-white disabled:hover:text-black flex items-center justify-center rounded-full disabled:opacity-40 disabled:hover:bg-transparent dark:disabled:hover:border-white disabled:cursor-not-allowed"
          >
            <FaMinus />
          </button>

          <p className="text-sm font-semibold">{item.quantity}</p>

          <button
            onClick={() => handleIncreaseQuantity(item)}
            disabled={item.quantity >= 5}
            className="w-6 h-6 hover:bg-yellow-500 cursor-pointer border hover:text-white disabled:hover:text-black flex items-center justify-center rounded-full disabled:opacity-40 disabled:hover:bg-transparent dark:disabled:hover:border-white disabled:cursor-not-allowed"
          >
            <FaPlus />
          </button>
        </div>

        <div className="w-1/3 flex items-center font-bold text-lg">
          <FormattedPrice amount={item.price * item.quantity} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
