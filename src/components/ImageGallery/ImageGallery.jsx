import { Component } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader/Loader';

import { PixabayApi } from 'services';

import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    images: null,
    perPage: 12,
    page: 1,
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.searchImages();
  }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { query } = this.props;

    if (prevProps.query !== query) {
      this.searchImages();
    }

    if (prevState.page !== page && page !== 1) {
      this.loadMoreImages();
    }
  }

  searchImages = async () => {
    this.setState({ loading: true });
    const { query } = this.props;
    const { perPage } = this.state;

    try {
      const { hits, totalHits } = await PixabayApi.getImages(query, perPage);

      this.setState({
        images: hits,
        totalPages: Math.ceil(totalHits / perPage),
        page: 1,
        loading: false,
        error: null,
      });

      if (!hits.length) {
        throw new Error('No images found');
      }
    } catch (error) {
      this.setState({ loading: false, error });
    }
  };

  loadMoreImages = async () => {
    this.setState({ loading: true });
    const { query } = this.props;
    const { page, perPage } = this.state;

    try {
      const { hits } = await PixabayApi.getImages(query, perPage, page);
      this.setState(({ images }) => ({
        images: [...images, ...hits],
        loading: false,
        error: null,
      }));
    } catch (error) {
      this.setState({ loading: false, error });
    }
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { images, loading, page, totalPages, error } = this.state;
    const canLoadMore = images?.length > 0 && page < totalPages;

    return (
      images && (
        <>
          {loading && <Loader />}

          <ul className={css.imageGallery}>
            {images?.map(image => (
              <ImageGalleryItem key={image.id} image={image} />
            ))}
          </ul>

          {error?.message && (
            <p className={css.errorMessage}>{error?.message}</p>
          )}

          {canLoadMore && <Button onClick={this.loadMore} title="Load more" />}
        </>
      )
    );
  }
}
