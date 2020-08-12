import { Card, Col, Row, Button } from "antd";
import useSwr from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const { Meta } = Card;

export default function Home() {
  
  const { data, error, mutate } = useSwr("/api/data", fetcher);

  const doMutate = () => {
    mutate({ ...data, lastUpdate: "mutated " }, true);
  };

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div style={{ marginTop: 100, padding: "15px" }}>

      <h1>Updated: {data.lastUpdate}</h1>
      <Button type="primary" onClick={doMutate}>
        Mutate
      </Button>

      <Row gutter={16}>
        {data.results.map((item) => (
          <Col span={4}>
            <Card hoverable cover={<img alt={item.name} src={item.image} />}>
              <Meta title={item.name} description={item.species} />
            </Card>
            <br />
          </Col>
        ))}
      </Row>

    </div>
  );
}
