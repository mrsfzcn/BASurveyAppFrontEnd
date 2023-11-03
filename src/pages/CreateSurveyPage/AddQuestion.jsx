import {useState, useEffect} from "react";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import BreadCrumbs from "../../components/BreadCrumbs";
import Input from "../../components/Input";
import Dropdown from "../../components/Dropdown";
import {useNavigate} from "react-router-dom";
import SurveyService from "../../services/SurveyService.js";
import "./createsurvey.css";
import {useLocation} from "react-router-dom";

function AddQuestion() {
    const location = useLocation();
    const surveyTitle = location.state.surveyTitle;
    const surveyOid = location.state.surveyOid;
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("option1");
    const navigate = useNavigate();
    const [isCancelConfirmationOpen, setIsCancelConfirmationOpen] =
        useState(false);

    const navigateMain = (e) => {
        navigate("/anketler");
    };
    const dropdownOptions = [
        {value: "option1", label: "Soru Cümlesine Göre"},
        {value: "option2", label: "Soru Etiketine Göre"},
        {value: "option3", label: "Soru Tipine Göre"},
    ];

    const handleCancel = (e) => {
        e.preventDefault();
        setIsCancelConfirmationOpen(true);
    };

    useEffect(() => {
        SurveyService.getQuestions()
            .then((response) => {
                setQuestions(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Sorular listelenirken bir hata oldu.", error);
            });
    }, []);

    function handleQuestionClick(question) {
        const order = selectedQuestions.length + 1;

        setQuestions((questions) =>
            questions.map((q) =>
                q.questionOid === question.questionOid
                    ? {...q, selected: !q.selected, required: false}
                    : q
            )
        );
        const updatedSelectedQuestions = selectedQuestions.filter(
            (q) => q.questionOid !== question.questionOid
        );

        setSelectedQuestions((prevSelectedQuestions) => [
            ...prevSelectedQuestions,
            {...question, required: false, order: order},
        ]);

        setQuestions((prevQuestions) =>
            prevQuestions.filter((q) => q.questionOid !== question.questionOid)
        );
    }

    const deleteSurveyHandle = async (surveyOid) => {
        try {
            const response = await SurveyService.delete(surveyOid);
        } catch (error) {
            console.log(error);
        }
    };

    function handleSelectedQuestionClick(question) {
        setSelectedQuestions((prevSelectedQuestions) =>
            prevSelectedQuestions.filter(
                (q) => q.questionOid !== question.questionOid
            )
        );

        setQuestions((prevQuestions) => [
            {...question, selected: false, required: false},
            ...prevQuestions,
        ]);
    }

    function toggleRequired(question) {
        const updatedQuestions = questions.map((q) => {
            if (q.questionOid === question.questionOid) {
                return {
                    ...q,
                    required: !q.required,
                };
            }
            return q;
        });

        const updatedSelectedQuestions = selectedQuestions.map((q) => {
            if (q.questionOid === question.questionOid) {
                return {
                    ...q,
                    required: !q.required,
                };
            }
            return q;
        });

        setQuestions(updatedQuestions);
        setSelectedQuestions(updatedSelectedQuestions);
    }

    const handlePreviewClick = () => {
        navigate("/on-izleme", {
            state: {surveyTitle, surveyOid, selectedQuestions},
        });
    };

    function includesIgnoreCase(mainString, subString) {
        return (
            mainString
                .toLocaleLowerCase("tr-TR")
                .includes(subString.toLocaleLowerCase("tr-TR")) ||
            mainString.toLowerCase().includes(subString.toLowerCase())
        );
    }

    const filteredQuestions = questions.filter((question) => {
        if (searchType === "option1") {
            return (
                question.questionString &&
                (includesIgnoreCase(question.questionString, searchTerm) ||
                    question.questionString.toLowerCase().includes(searchTerm))
            );
        } else if (searchType === "option2") {
            return (
                question.questionTags &&
                Array.isArray(question.questionTags) &&
                question.questionTags.some(
                    (tag) =>
                        tag &&
                        typeof tag === "string" &&
                        (includesIgnoreCase(tag, searchTerm) ||
                            tag.toLowerCase().includes(searchTerm))
                )
            );
        } else if (searchType === "option3") {
            return (
                question.questionType &&
                (includesIgnoreCase(question.questionType, searchTerm) ||
                    question.questionType.toLowerCase().includes(searchTerm))
            );
        }

        return true;
    });

    function handleSearchTypeChange(selectedOption) {
        setSearchType(selectedOption.value);
    }

    const header = {header: "Anket Oluşturma", href: "/anket-olustur"};

    const subtitle = [
        {
            title: "Anasayfa",
            href: "/yonetici-sayfasi",
        },
        {
            title: "Anket İşlemleri",
            href: "/anketler",
        },
        {
            title: "Anket Oluşturma",
            href: "/anket-olustur",
        },
    ];
    return (
        <Layout>
            <div className="flex flex-col h-full">
                <BreadCrumbs header={header} subtitle={subtitle}/>

                <div className="flex h-full justify-center items-center flex-col">
                    <div className="bg-gray-300 w-11/12 h-5/6 flex items-center justify-center rounded">
                        <div className="bg-white h-5/6 w-2/5 m-8 rounded flex flex-col overflow-auto">
                            <div className="flex flex-row">
                                <h2 className="text-left font-bold m-2 p-2">Anket Adı: </h2>
                                <p className="m-2 p-2">{surveyTitle}</p>
                            </div>
                            
                            {selectedQuestions.map((question, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-300 m-2 p-2 rounded-full cursor-pointer"
                                    onClick={() => handleSelectedQuestionClick(question)}
                                >
                                    <div className="flex items-center">
                                    <p>{question.questionType=="Matriks" ? question.questionString.split(" $$ ").join(", ") : question.questionString}</p>

                                        <div className="ml-auto">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    className="rounded-full checked:bg-[#64E9B1]"
                                                    checked={question.required}
                                                    onChange={() => toggleRequired(question)}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-white h-5/6 w-2/5 m-8 rounded flex flex-col overflow-auto">
                            <div className="flex justify-between">
                                <h2 className="text-left font-bold m-2 p-2">Sorular</h2>
                                {/* Arama kutusu */}
                                <div className="flex items-center">
                                    <Input
                                        type="text"
                                        placeholder="Soruları ara..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="h-full "
                                    />
                                    {/* Dropdown component'i */}
                                    <Dropdown
                                        options={dropdownOptions}
                                        value={dropdownOptions.find(
                                            (option) => option.value === searchType
                                        )}
                                        onChange={handleSearchTypeChange}
                                    />
                                </div>
                            </div>

                            {filteredQuestions.map((question, index) => (
                                <div
                                    key={index}
                                    className="bg-[#64E9B1] m-2 p-2 rounded-full cursor-pointer"
                                    onClick={() => handleQuestionClick(question)}
                                >
                                    <div className="flex items-center justify-between">
                                        <p>{question.questionType=="Matriks" ? question.questionString.split(" $$ ").join(", ") : question.questionString}</p>
                                        {question.selected && (
                                            <div className="ml-auto">
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        className="rounded-full checked:bg-gray-700"
                                                        checked={question.required}
                                                        onChange={() => toggleRequired(question)}
                                                    />
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-row gap-8">
                        <Button
                            primary
                            rounded
                            className="mt-8"
                            onClick={handlePreviewClick}
                        >
                            ÖNİZLEME
                        </Button>
                        <Button
                            secondary
                            rounded
                            className="mt-8"
                            onClick={(e) => handleCancel(e)}
                        >
                            VAZGEÇ
                        </Button>
                        {isCancelConfirmationOpen && (
                            <div
                                className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 bg-gray-800">
                                <div className="bg-white p-8 rounded shadow">
                                    <p className="text-xl font-bold mb-4">Emin misiniz?</p>
                                    <p>
                                        Ankete soru ekleme işleminden vazgeçmek istediğinize emin
                                        misiniz?
                                    </p>
                                    <p>Tüm Anketler Sayfasına Yönlendirileceksiniz.</p>
                                    <Button
                                        primary
                                        rounded
                                        className="mt-4"
                                        onClick={() => {
                                            deleteSurveyHandle(surveyOid);
                                            setIsCancelConfirmationOpen(false);
                                            navigate("/anketler");
                                        }}
                                    >
                                        Onayla
                                    </Button>
                                    <Button
                                        secondary
                                        rounded
                                        className="mt-4 mr-2"
                                        onClick={() => setIsCancelConfirmationOpen(false)}
                                    >
                                        İptal
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default AddQuestion;
