const { ThreeDots } = require('react-loader-spinner');
export const Loader = () => {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#303f9f"
      ariaLabel="three-dots-loading"
      wrapperStyle={{ margin: '0 auto' }}
      wrapperClassName=""
      visible={true}
    />
  );
};
