import arrowRight from '../../assets/arrowRight.png'

export const HomeLogo = () => {
    return (
        <img className="review__carousel--arrow" src={arrowRight} alt="Next" onClick={handleNextClick} />
    )
}