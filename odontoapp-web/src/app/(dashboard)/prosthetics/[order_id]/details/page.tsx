import React from "react";

// import { Container } from './styles';

type PageProps = {
  params: {
    order_id: string;
  };
};

const OrderDetailsPage: React.FC<PageProps> = ({ params }) => {
  return <h1>Order ID: {params.order_id}</h1>;
};

export default OrderDetailsPage;
