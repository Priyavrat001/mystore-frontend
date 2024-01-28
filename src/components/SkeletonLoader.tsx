
interface SkeletonProps{
  width?:string;
  length?:number;
}



const SkeletonLoader = ({width="unset", length=3}:SkeletonProps )=> {

  const skeleton = Array.from({length}, (_, idx)=><div key={idx} className="skeleton-shape"></div>);

  return (
    <>
    <div className="skeleton-loader">
        <div className="skeleton-shape" style={{width}}></div>
        {skeleton}
    </div>
    </>
  )
}

export default SkeletonLoader