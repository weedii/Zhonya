import Banner from "../components/Banner";
import Container from "../components/Container";
import Facilities from "../components/Facilities";
import ProductList from "../components/ProductList";

export default function Home() {
  return (
    <Container className="min-h-screen py-10">
      <Banner />
      <Facilities />
      <ProductList />
    </Container>
  );
}
