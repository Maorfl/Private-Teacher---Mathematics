/* eslint-disable no-irregular-whitespace */
import { FunctionComponent, useState } from "react";
import { Info } from "lucide-react";

interface PricesCatalogProps {}

const PricesCatalog: FunctionComponent<PricesCatalogProps> = () => {
    const [isClicked, setIsClicked] = useState(false);

    return (
        <>
            <div onClick={() => setIsClicked(!isClicked)} className="relative flex ms-5 items-center w-full">
                <p className="text-lg">מחירון:</p>
                <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white p-1 rounded ms-2">
                    <Info size={24} />
                </button>
                {isClicked && (
                    <div
                        className="absolute bg-white p-2 border border-gray-200 rounded-lg z-10 w-full"
                        style={{ top: "100%", left: "50%", transform: "translateX(-50%)" }}>
                        <p className="text-sm text-gray-600">
                            המחירון מחושב לפי <b>שעה</b>:
                            <br />
                            חטיבה (ז׳-ט׳) - 85
                            <br />
                            תיכון (י׳-יב׳) - 95
                            <br />
                            מכינה וסטודנטים - 110
                            <br />
                            חדו״א להנדסה - 130
                            <br />
                            טורים התמרות ומשוואות דיפרנציאליות - 130
                            <br />
                            <br />
                            *שיעור בבית התלמיד - <b>30 שקל תוספת</b>.
                            <br />
                            <br />
                            **אם בוחרים בזום - חטיבה ותיכון <b>5 שקל הנחה</b>.
                            <br />
                            מכינה, סטודנטים, חדו״א ומישדיפ <b>10 שקל הנחה</b>.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default PricesCatalog;
