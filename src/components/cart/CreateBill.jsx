import { Button, Card, Form, Input, Modal, Select, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/cardSlice";
import { useNavigate } from "react-router-dom";


const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const card = useSelector((state) => state.card);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/add-bill", {
        method: "POST",
        body: JSON.stringify({
          ...values, 
          subTotal: card.total,
          tax: ((card.total * card.tax) / 100).toFixed(2),
          totalAmount: (card.total + (card.total * card.tax) / 100).toFixed(2),
          cardItems: card.cardItems,
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"},
      })

      if (res.status === 200) {
        message.success("Fatura başarıyla oluşturuldu.")
        dispatch(reset());
        navigate("/bills")
      }
    } catch (error) {
      message.danger("Bir şeyler yanlış gitti.")
      console.log(error);
    }
  };

  return (
    <Modal
      title="Fatura Oluştur"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form layout={"vertical"} onFinish={onFinish}>
        <Form.Item
          label="Müşteri Adı"
          name={"customerName"}
          rules={[
            {
              required: true,
              message: "Username is required",
            },
          ]}
        >
          <Input placeholder="Bir Müşteri Adı Yazınız" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name={"customerPhoneNumber"}
          label="Tel No"
        >
          <Input placeholder="Bir Tel No Yazınız" maxLength={11} />
        </Form.Item>
        <Form.Item
          label="Ödeme Yöntemi"
          rules={[{ required: true }]}
          name={"paymentMode"}
        >
          <Select placeholder="Bir Ödeme Yöntemi Seçiniz">
            <Select.Option value="Nakit">Nakit</Select.Option>
            <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
          </Select>
        </Form.Item>
        <Card>
          <div className="flex justify-between">
            <span>Ara Toplam</span>
            <span>{card.total > 0 ? card.total.toFixed(2) : 0}₺</span>
          </div>
          <div className="flex justify-between my-2">
            <span>KDV %8</span>
            <span className="text-red-700">
              {(card.total * card.tax) / 100 > 0
                ? `+${((card.total * card.tax) / 100).toFixed(2)}`
                : 0}
              ₺
            </span>
          </div>
          <div className="flex justify-between">
            <b>Toplam</b>
            <b>
              {(card.total * card.tax) / 100 > 0
                ? (card.total + (card.total * card.tax) / 100).toFixed(2)
                : 0}
              ₺
            </b>
          </div>
          <div className="flex justify-end">
            <Button
              className="mt-4"
              type="primary"
              onClick={() => setIsModalOpen(true)}
              htmlType="submit"
              disabled={card.cardItems.length === 0}
            >
              Sipariş Oluştur
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};

export default CreateBill;