import { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
// import { toast } from "react-toastify";

import PlusIcon from '@components/Icons/PlusIcon';
import NegativeIcon from '@components/Icons/NegativeIcon';

import FAQService from '@services/FAQService';

import {
  Container,
  Title,
  PanelText
} from './index.styled';

const FAQ: React.FC = () => {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data }: any = await FAQService();
        if (data) {
          const convertedData: any = Object.keys(data).reduce((res: any, key) => {
            return [...res, {
              question: data[key]?.question?.replace(/\n/g, "<br />"),
              answer: data[key]?.answer?.replace(/\n/g, "<br />"),
            }];
          }, []);
          setFaqData(convertedData);
        }
      } catch (e) {
        // toast.error('Error in fetching data');
      }
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Title>FAQ</Title>
      {faqData.map(({ answer, question }): any =>
      (
        <Disclosure key={question} as="div" className="bg-neutral-5 px-6 py-2 rounded-lg mt-4 cursor-pointer">
          {({ open }) => (
            <>
              <Disclosure.Button as="div" className="py-2 flex items-start">
                <div>{open ? <NegativeIcon /> : <PlusIcon />}</div>
                <div className='ml-4' dangerouslySetInnerHTML={{ __html: question }}></div>
              </Disclosure.Button>
              <Disclosure.Panel className='ml-9'>
                <PanelText dangerouslySetInnerHTML={{ __html: answer }}>
                </PanelText>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))
      }
    </Container>
  );
};

export default FAQ;
