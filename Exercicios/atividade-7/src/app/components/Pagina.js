"use client";

import { Container } from "react-bootstrap";

export default function Pagina(props) {
  return (
    <>
      <div className="bg-secondary text-center text-white">
        <h1>{props.titulo}</h1>
      </div>

      <Container>{props.children}</Container>
    </>
  );
}
