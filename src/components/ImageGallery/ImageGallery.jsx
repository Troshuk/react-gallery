import { useState, useEffect } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader/Loader';

import { PixabayApi } from 'services';

import css from './ImageGallery.module.css';

const PER_PAGE = 12;

export const ImageGallery = ({ query }) => {
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [latestQuery, setLatestQuery] = useState(query);

  useEffect(() => {
    // If query was updated, then reset data before request
    if (query.trim() !== latestQuery.trim()) {
      setLatestQuery(query.trim());
      setPage(1);
      setImages([]);
      setTotalPages(0);
    } else {
      (async () => {
        setLoading(true);
        setError(null);

        try {
          if (latestQuery.trim()) {
            const { hits, totalHits } = await PixabayApi.getImages(
              latestQuery,
              PER_PAGE,
              page
            );

            setImages(images => [...images, ...hits]);

            if (page === 1) {
              setTotalPages(Math.ceil(totalHits / PER_PAGE));
            }

            if (!hits.length) {
              throw new Error('No images found');
            }
          }
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [query, page, latestQuery]);

  const loadMore = () => setPage(prevPage => prevPage + 1);

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

        {error?.message && <p className={css.errorMessage}>{error?.message}</p>}

        {canLoadMore && <Button onClick={loadMore} title="Load more" />}
      </>
    )
  );
};
