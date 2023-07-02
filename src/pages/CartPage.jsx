import { Button, Input, Space, Table, Card, message } from 'antd';
import { useRef, useState } from 'react';
import CreateBill from "../components/cart/CreateBill.jsx";
import Header from "../components/header/Header.jsx";
import { useSelector, useDispatch } from "react-redux";
import Highlighter from 'react-highlight-words';

import { PlusCircleOutlined, MinusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { deleteCard, incerase, decrase } from "../../src/redux/cardSlice";

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const card = useSelector((state) => state.card);
  const dispatch = useDispatch()

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      width: "125px",
      render: (text) => {
        return (<img src={text} />)
      }
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps('title'),
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps('category'),
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        return (
          <span>{text.toFixed(2)}₺</span>
        )
      },
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Ürün Adeti",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return (
          <div className="flex items-center gap-x-1">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={<PlusCircleOutlined />}
              onClick={() => dispatch(incerase(record))}
            />
            <span className="font-bold">{record.quantity}</span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={<MinusCircleOutlined />}
              onClick={() => {
                if (record.quantity === 1) {
                  if (window.confirm("Ürün silinsin mi?")) {
                    dispatch(decrase(record));
                    message.success("Ürün sepetten silindi")
                  }
                }
                if (record.quantity > 1) {
                  dispatch(decrase(record));
                }
              }}
            />
          </div>
        )
      }
    },
    {
      title: "Toplam Fiyat",
      render: (text, record) => {
        return (
          <span>{(record.quantity * record.price).toFixed(2)}₺</span>
        )
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (_, record) => {
        return (
          <div>
            <Button
              type="link"
              danger
              onClick={() => {
                dispatch(deleteCard(record));
                message.success("Ürün sepetten silindi");
              }}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  console.log(isModalOpen);

  return (
    <>
      <Header />
      <div className="px-6">
        <Table
          dataSource={card.cardItems}
          columns={columns}
          bordered
          pagination={false}
          scroll={{
            x: 1200,
            y: 300,
          }}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
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
            <Button
              className="mt-4 w-full"
              type="primary"
              size="large"
              onClick={() => setIsModalOpen(true)}
              disabled={card.cardItems.length === 0}
            >
              Sipariş Oluştur
            </Button>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default CartPage;