import { Card, Button, Col, Row } from "antd";
import { useSWRInfinite } from "swr";
import InfiniteScroll from "react-infinite-scroll-component";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const { Meta } = Card;
const PAGE_SIZE = 20;

const getKey = (pageIndex, previousPageData) => {
  console.log("getKey", previousPageData, pageIndex);
  if (previousPageData && !previousPageData.results.length) return null;
  console.log(`/api/data?page=${pageIndex}`);
  return `/api/data?page=${pageIndex}`; // SWR key
};

export default function Home() {
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => `/api/data?page=${index + 1}`,
    fetcher
  );

  const items = data ? [].concat(...data) : [];
  const isEmpty = data?.[0]?.length === 0;
  const hasMore = (data && data[data.length-1].info && data[data.length-1].info.next!==null);

  return (
    <div style={{ marginTop: 100, padding: "15px" }}>
      <InfiniteScroll
          dataLength={items.length}
          next={() => setSize(size + 1)}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}>

      <Row gutter={16}>
        {isEmpty ? <p>Yay, no characters found.</p> : null}
        {items.map((pageData) =>
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
      </InfiniteScroll>
    </div>
  );
}
