import { IMAGES } from '../../assets/images'

export const PaginationInfo = ({ currentPage, limit, totalRecords }) => {
  const start = (currentPage - 1) * limit + 1
  const end = Math.min(currentPage * limit, totalRecords)

  return (
    <p>
      Показаны {start}-{end} из {totalRecords} запис.
    </p>
  )
}

export const NoItemsLabel = () => {
  return (
    <div className="d-flex align-items-center justify-content-center py-5">
      <img src={IMAGES.noImage} width={120} height={120} alt="" />
      Ничего не найдено
    </div>
  )
}
