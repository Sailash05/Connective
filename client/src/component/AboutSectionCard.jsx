const AboutSectionCard = ({ value, txt, image, bgcolor}) => {
  return (
    <div className={`${bgcolor} w-64 px-4 py-2 rounded-xl`}>
        <img src={image} alt="Create Post" width={80}/>
        <h3 className="font-extrabold text-xl">{value}</h3>
        <p className="text-sm">{txt}</p>
    </div>
  )
}

export default AboutSectionCard