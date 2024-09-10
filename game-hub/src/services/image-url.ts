import noImage from "../assets/no-image-placeholder.webp";

const getCroppedImageUrl = (url: string) => {
  if (!url) return noImage;

  const target = "media/";
  //queremos colocar o crop depois de "media/", por isso é que fazermos o index e depois adicionamos o length da parte que pretendemos
  const index = url.indexOf(target) + target.length;

  //estamops a fazer isto porque a API do raw.io permite fazer crops das imagens que disponibiliza a partir do url, sendo que devemos meter crop, seguido da largura e depois da altura
  return url.slice(0, index) + "crop/600/400/" + url.slice(index);
};

export default getCroppedImageUrl;
