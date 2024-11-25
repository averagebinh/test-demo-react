import { useEffect, useState } from 'react';
import { getAllUsers } from '../../../services/apiServices';
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';

const TableUserPaginate = (props) => {
  const { t } = useTranslation();

  const { listUsers, pageCount } = props;

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    props.fetchListUsersWithPaginate(+event.selected + 1);
    props.setCurrentPage(+event.selected + 1);
    console.log(`User requested page number ${event.selected},`);
  };
  return (
    <>
      <table className='table table-hover table-bordered'>
        <thead>
          <tr>
            <th scope='col'>{t('admin.userPaginate.head.id')}</th>
            <th scope='col'>{t('admin.userPaginate.head.username')}</th>
            <th scope='col'>{t('admin.userPaginate.head.email')}</th>
            <th scope='col'>{t('admin.userPaginate.head.role')}</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user, index) => {
              return (
                <tr key={index}>
                  <th scope='row'>{user.id}</th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className='btn btn-secondary'
                      onClick={() => {
                        props.handleClickBtnView(user);
                      }}
                    >
                      {t('admin.userPaginate.head.button.view')}
                    </button>
                    <button
                      className='btn btn-warning mx-3'
                      onClick={() => {
                        props.handleClickBtnUpdate(user);
                      }}
                    >
                      {t('admin.userPaginate.head.button.update')}
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() => props.handleClickBtnDelete(user)}
                    >
                      {t('admin.userPaginate.head.button.delete')}
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan={5}> {t('admin.userPaginate.head.notfound')}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className='user-pagination d-flex justify-content-center'>
        <ReactPaginate
          nextLabel='next >'
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel='< prev'
          pageClassName='page-item'
          pageLinkClassName='page-link'
          previousClassName='page-item'
          previousLinkClassName='page-link'
          nextClassName='page-item'
          nextLinkClassName='page-link'
          breakLabel='...'
          breakClassName='page-item'
          breakLinkClassName='page-link'
          containerClassName='pagination'
          activeClassName='active'
          renderOnZeroPageCount={null}
          forcePage={props.currentPage - 1}
        />
      </div>
    </>
  );
};

export default TableUserPaginate;
