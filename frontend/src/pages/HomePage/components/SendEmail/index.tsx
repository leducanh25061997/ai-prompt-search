import Mail from '@/assets/Mail.svg';
import { FilterParams } from '@/types/Filter';

interface Props {
    isSubmit: boolean;
    data: any[];
    isRelevant: boolean | null;
    filterParams: FilterParams
}

const SendEmail = (props: Props) => {
    const { isSubmit, data, isRelevant, filterParams } = props;

    return(
        <div>
            {isSubmit && data.length === 0 && (isRelevant !== null) ? (
                <div className="mx-16 text-center">
                    <p className="text-[#3D375D] font-semibold text-2xl">No results found</p>
                    <div className="flex justify-center mt-2">
                        <p className="text-[#3D375D] font-normal text-sm w-[615px]">{`Try a new search, or enter your email to get free custom images for
Portobello mushrooms ${filterParams.keyword}`}</p>
                    </div>
                    <div className="flex justify-center mt-2 mb-6">
                        <div className="rounded-lg border-solid border-[1px] border-[#CECDD6] w-[310px] py-2.5 px-[18px] flex">
                            <img alt="mail" src={Mail} />
                            <input type="text" placeholder="Your email" className="w-full ml-2 focus:outline-none text-[#9E9BAE]" />
                        </div>
                        <div className="bg-neutral-100 text-neutral-5 rounded-lg px-6 py-2 ml-2">
                            <button>Send</button>
                        </div>
                    </div>
                </div>
            ) : ''}
        </div>
    );
};

export default SendEmail;