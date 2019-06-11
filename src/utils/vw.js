/**
 * 像素转换vw
 * @param {像素} pxnum
 */
export default function px2Vw ($px) {
    return $px / (750 / 100)
}
