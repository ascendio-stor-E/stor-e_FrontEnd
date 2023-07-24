import arrowLeft from '../../assets/arrowLeft.png'

export const HomeLogo = () => {
    return (
        <img className="review__carousel--arrow" src={arrowLeft} alt="Prev" onClick={handlePrevClick} />
    )
}