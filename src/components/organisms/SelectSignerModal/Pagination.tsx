import React from 'react';

type Props = {
  sum: number;
  per: number;
  onPageChange?: (e: { page: number }) => void;
  trezorFullAccounts?: any;
};

const Pagination: React.FC<Props> = ({ sum, per, onPageChange }) => {
  // 初回レンダリングかどうかを判定するための変数
  const isFirstRender = React.useRef(true);
  // 現在のページ番号
  const [currentPage, setPage] = React.useState(1);

  React.useEffect(() => {
    // 初回レンダリング時はスキップし、変数を更新する
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

    // 親コンポーネントにpage番号を渡す
    onPageChange?.({ page: currentPage });
  }, [currentPage]);

  // ページ数
  const totalPage: number = Math.ceil(sum / per);

  // 「<」がクリックされたときの処理
  const handleBack = (): void => {
    if (currentPage === 1) {
      return;
    }

    setPage(currentPage - 1);
  };

  // 「>」がクリックされたときの処理
  const handleForward = (): void => {
    if (currentPage === totalPage) {
      return;
    }

    setPage(currentPage + 1);
  };

  // ページ番号を直接クリックされたときの処理
  const handleMove = (page: number): void => {
    setPage(page);
  };

  return (
    <div className='flex flex-row justify-center w-full mt-4'>
      {/* ページ番号が0（= アイテムが0個）のときは何も描画しない */}
      {totalPage !== 0 && (
        <>
          <button onClick={() => handleBack()} className='p-2 mx-2'>
            ＜
          </button>
          <div className='flex flex-row gap-x-2'>
            {[...Array(totalPage).keys()].map((page) => {
              page++;

              return page === currentPage ? (
                <span key={page}>
                  <button
                    onClick={() => handleMove(page)}
                    className='py-2 px-4 rounded-lg transition ease-in-out bg-dark text-textWhite'
                  >
                    {page}
                  </button>
                </span>
              ) : (
                <span key={page}>
                  <button
                    onClick={() => handleMove(page)}
                    className='py-2 px-4'
                  >
                    {page}
                  </button>
                </span>
              );
            })}
          </div>
          <button onClick={() => handleForward()} className='p-2 mx-2'>
            ＞
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
