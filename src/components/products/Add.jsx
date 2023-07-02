import { Button, Form, Input, message, Modal, Select } from "antd";
import React from "react";

const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  products,
  categories,
  setProducts,
}) => {
  const [form] = Form.useForm();

  console.log("product", categories);

  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Ürün başarıyla eklendi.");
      form.resetFields();
      setProducts([
        ...products,
        {
          ...values,
          _id: Math.random(),
          price: Number(values.price),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Yeni Ürün Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Ürün Ekle"
          rules={[{ required: true, message: "Ürün Adı Alanı Boş Geçilemez!" }]}
        >
          <Input placeholder="Ürün Adı Giriniz"/>
        </Form.Item>
        <Form.Item
          name="img"
          label="Ürün Görseli"
          rules={[{ required: true, message: "Ürün Görseli Alanı Boş Geçilemez!" }]}
        >
          <Input placeholder="Ürün Görseli Giriniz"/>
        </Form.Item>
        <Form.Item
          name="price"
          label="Ürün Fiyatı"
          rules={[{ required: true, message: "Ürün Fiyatı Alanı Boş Geçilemez!" }]}
        >
          <Input placeholder="Ürün Fiyatı Giriniz"/>
        </Form.Item>
        <Form.Item
          name="category"
          label="Kategori"
          rules={[{ required: true, message: "Kategori Alanı Boş Geçilemez!" }]}
        >
          <Select
              showSearch
              placeholder="Kategori Seçin"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.title ?? '').includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? '').toLowerCase().localeCompare((optionB?.title ?? '').toLowerCase())
              }
              options={categories}
            />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;