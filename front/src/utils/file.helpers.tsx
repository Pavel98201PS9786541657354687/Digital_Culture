export const renderFileByType = (path, onLoad) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.svg'];
  const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.mkv', '.flv', '.webm'];

  const extension = path?.toLowerCase().split('.').pop();

  if (imageExtensions.includes(`.${extension}`)) {
    return (
      <img src={path} alt="" />
  );
  } else if (videoExtensions.includes(`.${extension}`)) {
    return (
      <video autoPlay muted loop onLoadedData={onLoad}>
    <source src={path} type="video/mp4" />
      Не удалось воспроизвести видео
    </video>
  );
  } else {
    return <div className="unsuported-type-informer">Тип файла не поддерживается</div>;
  }
};