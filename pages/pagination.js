import { Card, Button, Col, Row } from "antd";
import { useSWRInfinite } from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const { Meta } = Card;

const getKey = (pageIndex, previousPageData) => {
  console.log("getKey", previousPageData, pageIndex);
  if (previousPageData && !previousPageData.results.length) return null;
  console.log(`/api/data?page=${pageIndex}`);
  return `/api/data?page=${pageIndex}`; // SWR key
};

export default function Home() {
  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div style={{ marginTop: 100, padding: "15px" }}>
      <Row gutter={16}>
        {data.map((pageData) =>
          pageData.results.map((item) => (
            <Col span={4}>
              <Card hoverable cover={<img alt={item.name} src={item.image} />}>
                <Meta title={item.name} description={item.species} />
              </Card>
              <br />
            </Col>
          ))
        )}
      </Row>
      <Button
        type="primary"
        onClick={(page) => {
          setSize(size + 1);
        }}
      >
        Load more
      </Button>
    </div>
  );
}
