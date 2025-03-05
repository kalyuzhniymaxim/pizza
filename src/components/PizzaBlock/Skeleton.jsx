import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
  className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ffffff"
    {...props}
  >
    <circle cx="129" cy="117" r="110" /> 
    <rect x="-4" y="252" rx="10" ry="10" width="280" height="31" /> 
    <rect x="-4" y="312" rx="10" ry="10" width="280" height="84" /> 
    <rect x="10" y="422" rx="10" ry="10" width="107" height="44" /> 
    <rect x="145" y="417" rx="16" ry="16" width="122" height="44" />
  </ContentLoader>
)

export default Skeleton