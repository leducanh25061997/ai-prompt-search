import axios from 'axios';

const FAQService = async (): Promise<any>  => {
  return axios.get('https://galerie.ai/mediajson/galerie_faq.json');
};

export default FAQService;
