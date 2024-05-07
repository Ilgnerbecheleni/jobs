import image from '../../assets/trabalhos-autonomos.png';

function Banner() {
  return (
    <div className="container-fluid p-0">
      <div className="banner-img" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '50vh' }}></div>
    </div>
  );
}

export default Banner;
