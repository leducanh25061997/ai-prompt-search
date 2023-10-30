import styled from 'styled-components';

export const CustomMasonry = styled.div`
  .my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    width: auto;
  }
  .my-masonry-grid_column {
    margin-left: 20px; /* gutter size */
    background-clip: padding-box;
  }
  .my-masonry-grid_column:first-child {
    margin-left: 0px; /* gutter size */
  }
  .my-masonry-grid_column > div { /* change div to reference your elements you put in <Masonry> */
    margin-bottom: 20px;
  }
  .my-masonry-grid_column > div:nth-last-child(1) {
    margin-bottom: 0px;
  }
`;