"use client";

import { useState } from "react";
import { Col, Form, Row, Button, Image } from "react-bootstrap";
import { Formik, Field } from "formik";
import Pagina from "./components/Pagina";

export default function CambistaPage() {
  const [taxaConversao, setTaxaConversao] = useState("");
  const [imagemMoeda, setImagemMoeda] = useState("");

  function handleMoeda(moedaSelecionada) {
    let taxa = "";

    if (moedaSelecionada === "dolar") {
      taxa = "Taxa de conversão de dólar: 1 real = 0,20 dólares";
    } else if (moedaSelecionada === "euro") {
      taxa = "Taxa de conversão de euro: 1 real = 0,18 euros";
    } else if (moedaSelecionada === "bitcoin") {
      taxa = "Taxa de conversão de bitcoin: 1 real = 0,000003 bitcoins";
    }

    setTaxaConversao(taxa);
    setImagemMoeda(handleImage(moedaSelecionada)); // Atualiza a imagem da moeda
  }

  function handleConvertion(values) {
    let valorConvertido = 0;
    const { real, moeda } = values;

    if (moeda === "dolar") {
      valorConvertido = real * 0.2;
    } else if (moeda === "euro") {
      valorConvertido = real * 0.18;
    } else if (moeda === "bitcoin") {
      valorConvertido = real * 0.000003;
    }

    return valorConvertido;
  }

  function handleImage(moeda) {
    if (moeda === "dolar") {
      return "/dolar.png";
    } else if (moeda === "euro") {
      return "/euro.png";
    } else if (moeda === "bitcoin") {
      return "/bitcoin.png";
    } else {
      return "/cambio.jpg";
    }
  }

  return (
    <Pagina titulo="Conversor de Moedas">
      <Formik
        initialValues={{ real: 1, moeda: "", equacao: 0 }}
        onSubmit={(values, { setFieldValue }) => {
          const valorConvertido = handleConvertion(values);
          setFieldValue("equacao", valorConvertido);
        }}
      >
        {({ values, setFieldValue, handleSubmit, resetForm }) => (
          <Form onSubmit={handleSubmit}>
            <Row md={5}>
              <Col md={6} className="py-2">
                <Form.Group>
                  <Form.Label>{taxaConversao}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Real</Form.Label>
                  <Field
                    className="form-control"
                    type="number"
                    name="real"
                    step={0.01}
                    onChange={(e) => {
                      setFieldValue("real", e.target.value);
                      const valorConvertido = handleConvertion({
                        real: e.target.value,
                        moeda: values.moeda,
                      });
                      setFieldValue("equacao", valorConvertido);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>{values.moeda}</Form.Label>
                  <Field
                    className="form-control"
                    type="number"
                    name="equacao"
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="py-2">
                <Form.Group className="mb-3">
                  <Form.Label>Escolha a moeda:</Form.Label>
                  <Field
                    as="select"
                    className="form-control"
                    name="moeda"
                    onChange={(e) => {
                      setFieldValue("moeda", e.target.value);
                      handleMoeda(e.target.value);
                      const valorConvertido = handleConvertion({
                        real: values.real,
                        moeda: e.target.value,
                      });
                      setFieldValue("equacao", valorConvertido);
                    }}
                  >
                    <option value="">Selecione</option>
                    <option value="dolar">Dólar</option>
                    <option value="euro">Euro</option>
                    <option value="bitcoin">Bitcoin</option>
                  </Field>
                </Form.Group>

                {imagemMoeda && (
                  <Image
                    src={imagemMoeda} // Renderiza a imagem da moeda
                    alt="Moeda Selecionada"
                    fluid
                    style={{ maxWidth: "100px" }}
                  />
                )}
              </Col>
            </Row>

            <Row>
              <Col className="py-2">
                <Button variant="primary" type="submit" className="me-2">
                  Converter
                </Button>
                <Button
                  variant="secondary"
                  type="button"
                  className="me-2"
                  onClick={() => {
                    setFieldValue("real", "");
                    setFieldValue("moeda", "");
                    setFieldValue("equacao", 0);
                    setTaxaConversao("");
                    setImagemMoeda(""); // Limpa a imagem também
                  }}
                >
                  Limpar
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}
