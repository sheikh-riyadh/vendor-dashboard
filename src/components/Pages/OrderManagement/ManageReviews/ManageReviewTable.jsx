import moment from "moment";
import Table from "../../../Common/Table";
import ReviewView from "./ReviewView";
import { FaStar } from "react-icons/fa6";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useGetReviewQuery } from "../../../../store/service/review/reviewApi";
import { useGetSeller } from "../../../../hooks/useGetSeller";
import PropTypes from "prop-types";
import LoadingSpinner from "../../../Common/LoadingSpinner";
import { useState } from "react";
import Pagination from "../../../Common/Pagination";
const ManageReviewTable = ({ selectTabOption, search }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const { seller } = useGetSeller();

  const query = new URLSearchParams({
    sellerId: seller?._id,
    rating: selectTabOption,
    email: seller?.email,
    search,
    limit,
    page: currentPage,
  }).toString();
  const { data, isLoading } = useGetReviewQuery(query);
  const pages = Math.ceil(Math.abs(data?.total ?? 0) / parseInt(limit));

  return (
    <div className="overflow-hidden">
      {!isLoading ? (
        <Table
          className="font-normal"
          tableData={data?.data}
          columns={[
            {
              name: "Images",
              render: ({ item }) => {
                return (
                  <div className="flex gap-2">
                    <PhotoProvider>
                      {item?.productInfo?.map((product) => (
                        <figure key={product?._id}>
                          <PhotoView src={product?.image}>
                            <div className="border w-10 h-10 rounded p-1 cursor-pointer">
                              <img
                                className="h-full w-full"
                                src={product?.image}
                                alt="product_gallery_image"
                              />
                            </div>
                          </PhotoView>
                        </figure>
                      ))}
                    </PhotoProvider>
                  </div>
                );
              },
            },
            {
              name: "Rating",
              render: ({ item }) => {
                return (
                  <div className="flex gap-1 items-center">
                    {[...Array(item?.rating?.rating).keys()].map((rating) => (
                      <div key={rating}>
                        <FaStar className="text-accent" />
                      </div>
                    ))}
                  </div>
                );
              },
            },
            {
              name: "Review Message",
              index: "reviewMessage",
              dataIndex: "reviewMessage",
            },
            {
              name: "Time",
              render: ({ item }) => {
                return <div>{moment(item?.createdAt).format("LL")}</div>;
              },
            },
            {
              name: "Actions",
              render: ({ item }) => {
                return (
                  <div className="flex gap-3">
                    <ReviewView item={item} />
                  </div>
                );
              },
            },
          ]}
        />
      ) : (
        <LoadingSpinner />
      )}
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setLimit={setLimit}
        key={"product_pagination"}
      />
    </div>
  );
};

ManageReviewTable.propTypes = {
  selectTabOption: PropTypes.number,
  search: PropTypes.string,
};

export default ManageReviewTable;
