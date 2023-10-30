import IImage from "@/models/IImage";
import { ImagesData } from "@/models/LexicaModel";

export const exportExcel = (url: string, fileName: string) => {
  const blob = new Blob([url]);
  const downloadUrl = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.setAttribute('download', `Staff(${fileName}).xlsx`);
  document.body.appendChild(a);
  a.click();
};
export const exportExcelCostumer = (url: string, fileName: string) => {
  const blob = new Blob([url]);
  const downloadUrl = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.setAttribute('download', `Customer(${fileName}).xlsx`);
  document.body.appendChild(a);
  a.click();
};

export const replaceCharacter = (text: string) => {
  const split = text.split('.');
  text = split[split.length - 1];
  const subText = text.charAt(0).toUpperCase() + text.slice(1);
  return subText.replaceAll('_', ' ');
};

export const serialize = (params: any) => {
  const str = [];
  for (const p in params)
    if (params.hasOwnProperty(p)) {
      if (params[p] !== '') {
        str.push(encodeURIComponent(p) + '=' + params[p]);
      }
    }
  return str.join('&');
};

export const serializeExport = (params: any) => {
  const str = [];
  for (const p in params)
    if (params.hasOwnProperty(p)) {
      if (!!params[p] && params[p] !== '') {
        str.push(encodeURIComponent(p) + '=' + params[p]);
      }
    }
  return str.join('&');
};

export const createMinute = (ms: string) => {
  const date = new Date();
  const createMili = Date.parse(ms);
  const milliseconds = Date.parse(`${date}`) - createMili;
  const mins = Math.floor(milliseconds / 60000);
  if (mins <= 1) {
    return 'Just now';
  } else if (mins >= 60 && mins < 1440) {
    return Math.floor(mins / 60) + 'h';
  } else if (mins >= 1440 && mins < 2880) {
    return Math.floor(mins / 1440) + ' day ago';
  } else if (mins >= 2880) {
    return Math.floor(mins / 1440) + ' days ago';
  } else {
    return mins + 'm';
  }
};

export const isObject = (data: any) => {
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    return true;
  }
  return false;
} 

export function ChangeToSlug(title: string)
{
    let slug = '';

 
    //Đổi chữ hoa thành chữ thường
    slug = title.toLowerCase();
 
    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, " - ");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    //In slug ra textbox có id “slug”
    return slug;
}

export const convertLexicaResponseToImageGallery = (data: ImagesData[]) => {
  let image_list: IImage[] = [];
  for (let idx = 0; idx < data.length; idx++) {
      let image: IImage = {
          id: data[idx].id,
          src: data[idx].imageUrl,
          width: data[idx].params.imgW,
          height: data[idx].params.imgH,
          tags: [
              { value: "Stable Diffusion", title: "Stable Diffusion" },
          ],
          cfg_scale: Number(data[idx].params.cfgScale),
          caption: data[idx].prompt || data[idx].promptContent,
          // model_name: data[idx].model,
          prompt: data[idx].prompt || data[idx].promptContent,
          seed: Number(data[idx].params.seed),
          source: data[idx].source,
          title: data[idx].title && data[idx].title !== 'N/A' ? data[idx].title : '',
      }
      image_list.push(image);
  }
  return image_list;
};