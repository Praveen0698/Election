import React, { useEffect, useState } from "react";
import HeadDashboard from "../../components/HeadDashboard";
import Sidebar from "../../components/Sidebar";
import { LiaGreaterThanSolid } from "react-icons/lia";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import DataNotFound from '../../assets/images/no data 1.png'
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import { styled } from "@mui/system";

const VoterDatabase = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 0 0 0 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0rem;
  }
`;

  const [formData, setFormData] = useState({
    state: "",
    district: "",
    postOffice: "",
    pin: "",
  });
  const [voter, setVoter] = useState([]);
  const [click, setClick] = useState(false);
  const [search, setSearch] = useState("");

  const [navClick, setNavClick] = useState(false);
  const [side, setSide] = useState(false);
  const Type = [
    "ANDAMAN & NICOBAR ISLANDS",
    "ANDHRA PRADESH",
    "ARUNACHAL PRADESH",
    "ASSAM",
    "BIHAR",
    "CHANDIGARH",
    "CHATTISGARH",
    "DAMAN & DIU",
    "DELHI",
    "GOA",
    "GUJARAT",
    "HIMACHAL PRADESH",
    "JAMMU & KASHMIR",
    "JHARKHAND",
    "KARNATAKA",
    "KERALA",
    "LAKSHADWEEP",
    "MADHYA PRADESH",
    "MAHARASHTRA",
    "MANIPUR",
    "MEGHALAYA",
    "MIZORAM",
    "NAGALAND",
    "ODISHA",
    "PONDICHERRY",
    "PUNJAB",
    "RAJASTHAN",
    "SIKKIM",
    "TAMIL NADU",
    "TELANGANA",
    "TRIPURA",
    "UTTAR PRADESH",
    "UTTARAKHAND",
    "WEST BENGAL",
  ];

  const district = [
    {
      "ANDAMAN & NICOBAR ISLANDS": [
        "Nicobar",
        "North And Middle Andaman",
        "South Andaman",
      ],
      "ANDHRA PRADESH": [
        "Ananthapur",
        "Chittoor",
        "Cuddapah",
        "East Godavari",
        "Guntur",
        "Krishna",
        "Kurnool",
        "Nellore",
        "Prakasam",
        "Srikakulam",
        "Visakhapatnam",
        "Vizianagaram",
        "West Godavari",
      ],
      "ARUNACHAL PRADESH": [
        "Changlang",
        "Dibang Valley",
        "East Kameng",
        "East Siang",
        "Kurung Kumey",
        "Lohit",
        "Lower Dibang Valley",
        "Lower Subansiri",
        "Papum Pare",
        "Tawang",
        "Tirap",
        "Upper Siang",
        "Upper Subansiri",
        "West Kameng",
        "West Siang",
      ],
      ASSAM: [
        "Barpeta",
        "Bongaigaon",
        "Cachar",
        "Darrang",
        "Dhemaji",
        "Dhubri",
        "Dibrugarh",
        "Goalpara",
        "Golaghat",
        "Hailakandi",
        "Jorhat",
        "Kamrup",
        "Karbi Anglong",
        "Karimganj",
        "Kokrajhar",
        "Lakhimpur",
        "Marigaon",
        "Nagaon",
        "Nalbari",
        "North Cachar Hills",
        "Sibsagar",
        "Sonitpur",
        "Tinsukia",
      ],
      BIHAR: [
        "Arwal",
        "Banka",
        "Begusarai",
        "Bhagalpur",
        "Bhojpur",
        "Buxar",
        "Darbhanga",
        "East Champaran",
        "Gaya",
        "Jamui",
        "Jehanabad",
        "Kaimur (Bhabua)",
        "Khagaria",
        "Lakhisarai",
        "Madhubani",
        "Munger",
        "Muzaffarpur",
        "Nalanda",
        "Nawada",
        "Patna",
        "Rohtas",
        "Samastipur",
        "Sheikhpura",
        "Sitamarhi",
        "Supaul",
        "Vaishali",
      ],
      CHANDIGARH: ["Chandigarh"],
      CHATTISGARH: [
        "Bastar",
        "Bijapur(CGH)",
        "Bilaspur(CGH)",
        "Dantewada",
        "Dhamtari",
        "Durg",
        "Gariaband",
        "Janjgir-champa",
        "Jashpur",
        "Kanker",
        "Kawardha",
        "Korba",
        "Koriya",
        "Mahasamund",
        "Narayanpur",
        "Raigarh",
        "Raipur",
        "Rajnandgaon",
        "Surguja",
      ],
      "DAMAN & DIU": ["Diu"],
      DELHI: [
        "Central Delhi",
        "East Delhi",
        "New Delhi",
        "North Delhi",
        "North East Delhi",
        "North West Delhi",
        "South Delhi",
        "South West Delhi",
        "West Delhi",
      ],
      GOA: ["North Goa", "South Goa"],
      GUJARAT: [
        "Ahmedabad",
        "Amreli",
        "Anand",
        "Banaskantha",
        "Bharuch",
        "Bhavnagar",
        "Dahod",
        "Gandhi Nagar",
        "Jamnagar",
        "Junagadh",
        "Kachchh",
        "Kheda",
        "Mahesana",
        "Narmada",
        "Navsari",
        "Panch Mahals",
        "Patan",
        "Porbandar",
        "Rajkot",
        "Sabarkantha",
        "Surat",
        "Surendra Nagar",
        "Tapi",
        "The Dangs",
        "Vadodara",
      ],
      "HIMACHAL PRADESH": [
        "Bilaspur (HP)",
        "Hamirpur(HP)",
        "Kangra",
        "Kinnaur",
        "Kullu",
        "Lahul & Spiti",
        "Mandi",
        "Shimla",
        "Sirmaur",
        "Solan",
        "Una",
      ],
      "JAMMU & KASHMIR": [
        "Ananthnag",
        "Bandipur",
        "Baramulla",
        "Budgam",
        "Doda",
        "Jammu",
        "Kargil",
        "Kathua",
        "Kulgam",
        "Kupwara",
        "Leh",
        "Poonch",
        "Pulwama",
        "Rajauri",
        "Reasi",
        "Shopian",
        "Srinagar",
        "Udhampur",
      ],
      JHARKHAND: [
        "Bokaro",
        "Chatra",
        "Deoghar",
        "Dhanbad",
        "Dumka",
        "East Singhbhum",
        "Garhwa",
        "Giridh",
        "Godda",
        "Gumla",
        "Hazaribag",
        "Jamtara",
        "Khunti",
        "Koderma",
        "Latehar",
        "Lohardaga",
        "Pakur",
        "Palamau",
        "Ramgarh",
        "Ranchi",
        "Sahibganj",
        "Seraikela-kharsawan",
        "Simdega",
        "West Singhbhum",
      ],
      KARNATAKA: [
        "Bagalkot",
        "Bangalore",
        "Bangalore Rural",
        "Belgaum",
        "Bellary",
        "Bidar",
        "Bijapur(KAR)",
        "Chamrajnagar",
        "Chickmagalur",
        "Chikkaballapur",
        "Chitradurga",
        "Dakshina Kannada",
        "Davangere",
        "Dharwad",
        "Gadag",
        "Gulbarga",
        "Hassan",
        "Haveri",
        "Kodagu",
        "Kolar",
        "Koppal",
        "Mandya",
        "Mysore",
        "Raichur",
        "Ramanagar",
        "Shimoga",
        "Tumkur",
        "Udupi",
        "Uttara Kannada",
        "Yadgir",
      ],
      KERALA: [
        "Alappuzha",
        "Ernakulam",
        "Idukki",
        "Kannur",
        "Kasargod",
        "Kollam",
        "Kottayam",
        "Kozhikode",
        "Malappuram",
        "Palakkad",
        "Pathanamthitta",
        "Thiruvananthapuram",
        "Thrissur",
        "Wayanad",
      ],
      LAKSHADWEEP: ["Lakshadweep"],
      "MADHYA PRADESH": [
        "Alirajpur",
        "Anuppur",
        "Ashok Nagar",
        "Balaghat",
        "Barwani",
        "Betul",
        "Bhind",
        "Bhopal",
        "Burhanpur",
        "Chhatarpur",
        "Chhindwara",
        "Damoh",
        "Datia",
        "Dewas",
        "Dhar",
        "Dindori",
        "East Nimar",
        "Guna",
        "Gwalior",
        "Harda",
        "Hoshangabad",
        "Indore",
        "Jabalpur",
        "Jhabua",
        "Katni",
        "Khandwa",
        "Khargone",
        "Mandla",
        "Mandsaur",
        "Morena",
        "Narsinghpur",
        "Neemuch",
        "Panna",
        "Raisen",
        "Rajgarh",
        "Ratlam",
        "Rewa",
        "Sagar",
        "Satna",
        "Sehore",
        "Seoni",
        "Shahdol",
        "Shajapur",
        "Sheopur",
        "Shivpuri",
        "Sidhi",
        "Singrauli",
        "Tikamgarh",
        "Ujjain",
        "Umaria",
        "Vidisha",
        "West Nimar",
      ],
      MAHARASHTRA: [
        "Ahmed Nagar",
        "Akola",
        "Amravati",
        "Aurangabad",
        "Beed",
        "Bhandara",
        "Buldhana",
        "Chandrapur",
        "Dhule",
        "Gadchiroli",
        "Gondia",
        "Hingoli",
        "Jalgaon",
        "Jalna",
        "Kolhapur",
        "Latur",
        "Mumbai",
        "Nagpur",
        "Nanded",
        "Nandurbar",
        "Nashik",
        "Osmanabad",
        "Parbhani",
        "Pune",
        "Raigarh(MH)",
        "Ratnagiri",
        "Sangli",
        "Satara",
        "Sindhudurg",
        "Solapur",
        "Thane",
        "Wardha",
        "Washim",
        "Yavatmal",
      ],
      MANIPUR: [
        "Bishnupur",
        "Chandel",
        "Churachandpur",
        "Imphal East",
        "Imphal West",
        "Senapati",
        "Tamenglong",
        "Thoubal",
        "Ukhrul",
      ],
      MEGHALAYA: [
        "East Garo Hills",
        "East Khasi Hills",
        "Jaintia Hills",
        "Ri Bhoi",
        "South Garo Hills",
        "West Garo Hills",
        "West Khasi Hills",
      ],
      MIZORAM: [
        "Aizawl",
        "Champhai",
        "Kolasib",
        "Lawngtlai",
        "Lunglei",
        "Mammit",
        "Saiha",
        "Serchhip",
      ],
      NAGALAND: [
        "Dimapur",
        "Kiphire",
        "Kohima",
        "Longleng",
        "Mokokchung",
        "Mon",
        "Peren",
        "Phek",
        "Tuensang",
        "Wokha",
        "Zunhebotto",
      ],
      ODISHA: [
        "Angul",
        "Bargarh",
        "Bhadrak",
        "Balasore",
        "Balangir",
        "Boudh",
        "Cuttack",
        "Debagarh",
        "Dhenkanal",
        "Gajapati",
        "Ganjam",
        "Jagatsinghpur",
        "Jajapur",
        "Jharsuguda",
        "Kalahandi",
        "Kandhamal",
        "KendraPara",
        "Keonjhar",
        "Khurda",
        "Koraput",
        "Malkangiri",
        "Mayurbhanj",
        "Nabarangapur",
        "Nayagarh",
        "Nuapada",
        "Puri",
        "Rayagada",
        "Sambalpur",
        "Sonepur",
        "Sundergarh",
      ],
      PONDICHERRY: ["Karaikal", "Mahe", "Pondicherry"],
      PUNJAB: [
        "Amritsar",
        "Barnala",
        "Bathinda",
        "Faridkot",
        "Fatehgarh Sahib",
        "Fazilka",
        "Firozpur",
        "Gurdaspur",
        "Hoshiarpur",
        "Jalandhar",
        "Kapurthala",
        "Ludhiana",
        "Mansa",
        "Moga",
        "Mohali",
        "Muktsar",
        "Nawanshahr",
        "Pathankot",
        "Patiala",
        "Ropar",
        "Rupnagar",
        "Sangrur",
        "Tarn Taran",
      ],
      RAJASTHAN: [
        "Ajmer",
        "Alwar",
        "Banswara",
        "Baran",
        "Barmer",
        "Bharatpur",
        "Bhilwara",
        "Bikaner",
        "Bundi",
        "Chittorgarh",
        "Churu",
        "Dausa",
        "Dholpur",
        "Dungarpur",
        "Ganganagar",
        "Hanumangarh",
        "Jaipur",
        "Jaisalmer",
        "Jalor",
        "Jhalawar",
        "Jhujhunu",
        "Jodhpur",
        "Karauli",
        "Kota",
        "Nagaur",
        "Pali",
        "Rajsamand",
        "Sawai Madhopur",
        "Sikar",
        "Sirohi",
        "Tonk",
        "Udaipur",
      ],
      SIKKIM: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
      "TAMIL NADU": [
        "Ariyalur",
        "Chennai",
        "Coimbatore",
        "Cuddalore",
        "Dharmapuri",
        "Dindigul",
        "Erode",
        "Kanchipuram",
        "Kanyakumari",
        "Karur",
        "Krishnagiri",
        "Madurai",
        "Nagapattinam",
        "Namakkal",
        "Nilgiris",
        "Perambalur",
        "Pudukkottai",
        "Ramanathapuram",
        "Salem",
        "Sivaganga",
        "Thanjavur",
        "Theni",
        "Tiruchirappalli",
        "Tirunelveli",
        "Tiruvallur",
        "Tiruvannamalai",
        "Tiruvarur",
        "Tuticorin",
        "Vellore",
        "Villupuram",
        "Virudhunagar",
      ],
      TELANGANA: [
        "Adilabad",
        "Hyderabad",
        "K.V.Rangareddy",
        "Karim Nagar",
        "Khammam",
        "Mahabub Nagar",
        "Medak",
        "Nalgonda",
        "Nizamabad",
        "Warangal",
      ],
      TRIPURA: ["Dhalai", "North Tripura", "South Tripura", "West Tripura"],
      "UTTAR PRADESH": [
        "Agra",
        "Aligarh",
        "Allahabad",
        "Ambedkar Nagar",
        "Auraiya",
        "Azamgarh",
        "Bagpat",
        "Bahraich",
        "Ballia",
        "Balrampur",
        "Banda",
        "Barabanki",
        "Bareilly",
        "Basti",
        "Bijnor",
        "Budaun",
        "Bulandshahr",
        "Chandauli",
        "Chitrakoot",
        "Deoria",
        "Etah",
        "Etawah",
        "Faizabad",
        "Farrukhabad",
        "Fatehpur",
        "Firozabad",
        "Gautam Buddha Nagar",
        "Ghaziabad",
        "Ghazipur",
        "Gonda",
        "Gorakhpur",
        "Hamirpur",
        "Hardoi",
        "Hathras",
        "Jalaun",
        "Jaunpur",
        "Jhansi",
        "Jyotiba Phule Nagar",
        "Kannauj",
        "Kanpur Dehat",
        "Kanpur Nagar",
        "Kaushambi",
        "Kheri",
        "Kushinagar",
        "Lalitpur",
        "Lucknow",
        "Maharajganj",
        "Mahoba",
        "Mainpuri",
        "Mathura",
        "Mau",
        "Meerut",
        "Mirzapur",
        "Moradabad",
        "Muzaffarnagar",
        "Pilibhit",
        "Pratapgarh",
        "Raebareli",
        "Rampur",
        "Saharanpur",
        "Sant Kabir Nagar",
        "Sant Ravidas Nagar",
        "Shahjahanpur",
        "Shrawasti",
        "Siddharthnagar",
        "Sitapur",
        "Sonbhadra",
        "Sultanpur",
        "Unnao",
        "Varanasi",
      ],
      UTTARAKHAND: [
        "Almora",
        "Bageshwar",
        "Chamoli",
        "Champawat",
        "Dehradun",
        "Haridwar",
        "Nainital",
        "Pauri Garhwal",
        "Pithoragarh",
        "Rudraprayag",
        "Tehri Garhwal",
        "Udham Singh Nagar",
        "Uttarkashi",
      ],
      "WEST BENGAL": [
        "Bankura",
        "Bardhaman",
        "Birbhum",
        "Cooch Behar",
        "Darjiling",
        "East Midnapore",
        "Hooghly",
        "Howrah",
        "Jalpaiguri",
        "Kolkata",
        "Malda",
        "Medinipur",
        "Murshidabad",
        "Nadia",
        "North 24 Parganas",
        "North Dinajpur",
        "Puruliya",
        "South 24 Parganas",
        "South Dinajpur",
        "West Midnapore",
      ],
    },
  ];

  const Odisha = [
    {
      Angul: [
        {
          postOffice: "Aida B.O",
          pinCode: "759125",
        },
        {
          postOffice: "Angapada B.O",
          pinCode: "759126",
        },
        {
          postOffice: "Angul H.O",
          pinCode: "759122",
        },
        {
          postOffice: "Ankula B.O	",
          pinCode: "759132",
        },
        {
          postOffice: "Arahat B.O	",
          pinCode: "759128",
        },
        {
          postOffice: "Arkil B.O",
          pinCode: "759100",
        },
        {
          postOffice: "Athamallik S.O	",
          pinCode: "759125",
        },
        {
          postOffice: "Badagundari B.O",
          pinCode: "759117",
        },
        {
          postOffice: "Badajarada B.O	",
          pinCode: "759103",
        },
        {
          postOffice: "Badakantakul B.O",
          pinCode: "759129",
        },
        {
          postOffice: "Badakera B.O",
          pinCode: "759132",
        },
        {
          postOffice: "Badakhali B.O",
          pinCode: "759117",
        },
        {
          postOffice: "Badasada B.O",
          pinCode: "759117",
        },
        {
          postOffice: "Badatribida B.O",
          pinCode: "759117",
        },
        {
          postOffice: "Badkerjang B.O",
          pinCode: "759143",
        },
        {
          postOffice: "Bagedia S.O",
          pinCode: "759141",
        },
        {
          postOffice: "Bajrakote B.O",
          pinCode: "759105",
        },
        {
          postOffice: "Balanda S.O",
          pinCode: "759116",
        },
        {
          postOffice: "Balanga B.O",
          pinCode: "759132",
        },
        {
          postOffice: "Balasinga B.O",
          pinCode: "759129",
        },
        {
          postOffice: "Balipasi B.O",
          pinCode: "759105",
        },
        {
          postOffice: "Balipatta B.O",
          pinCode: "759124",
        },
        {
          postOffice: "Ballahar Chhak B.O",
          pinCode: "759104",
        },
        {
          postOffice: "Baluakata B.O",
          pinCode: "759129",
        },
        {
          postOffice: "Bamur B.O",
          pinCode: "759126",
        },
        {
          postOffice: "Bandhabhuin B.O",
          pinCode: "759119",
        },
        {
          postOffice: "Bantala S.O",
          pinCode: "759129",
        },
        {
          postOffice: "Baragounia B.O",
          pinCode: "759129",
        },
        {
          postOffice: "Barasahi B.O",
          pinCode: "759141",
        },
        {
          postOffice: "Barkotia B.O",
          pinCode: "759118",
        },
        {
          postOffice: "Basala B.O",
          pinCode: "YourpinCode",
        },
        {
          postOffice: "Basantapur B.O",
          district: "Angul",
          pinCode: "759141",
        },
        {
          postOffice: "Bedasasan B.O",
          district: "Angul",
          pinCode: "759129",
        },
        {
          postOffice: "Bhejigotha B.O",
          district: "Angul",
          pinCode: "759125",
        },
        {
          postOffice: "Bijigol B.O",
          district: "Angul",
          pinCode: "759117",
        },
        {
          postOffice: "Bileinali B.O",
          district: "Angul",
          pinCode: "759125",
        },
        {
          postOffice: "Bimalabeda B.O",
          district: "Angul",
          pinCode: "759127",
        },
        {
          postOffice: "Biru B.O",
          district: "Angul",
          pinCode: "759100",
        },
        {
          postOffice: "Bonda B.O",
          pinCode: "759128",
        },
        {
          postOffice: "Brahmanbil B.O",
          pinCode: "759130",
        },
        {
          postOffice: "Budhapanka B.O",
          pinCode: "759128",
        },
        {
          postOffice: "Burukuna B.O",
          pinCode: "759100",
        },
        {
          postOffice: "Chainpal Colony S.O",
          pinCode: "759104",
        },
        {
          postOffice: "Champatimunda B.O",
          pinCode: "759132",
        },
        {
          postOffice: "Changudia B.O",
          pinCode: "759130",
        },
        {
          postOffice: "Chasagurjang B.O",
          pinCode: "759119",
        },
        {
          postOffice: "Chhendipada S.O",
          pinCode: "759124",
        },
        {
          postOffice: "Dandasinga B.O",
          pinCode: "759127",
        },
        {
          postOffice: "Danra B.O",
          pinCode: "759103",
        },
        {
          postOffice: "Deepasikha S.O",
          pinCode: "759147",
        },
        {
          postOffice: "Dera S.O",
          pinCode: "759103",
        },
        {
          postOffice: "Derang B.O",
          pinCode: "759117",
        },
        {
          postOffice: "Deulbera Colliery S.O",
          pinCode: "759102",
        },
        {
          postOffice: "Dharampur B.O",
          pinCode: "759100",
        },
        {
          postOffice: "Dhokuta B.O",
          pinCode: "759129",
        },
        {
          postOffice: "Dimiria B.O",
          pinCode: "759119",
        },
        {
          postOffice: "Durgapur B.O",
          pinCode: "759127",
        },
        {
          postOffice: "Durgapur B.O",
          pinCode: "759100",
        },
        {
          postOffice: "Ekagharia B.O",
          pinCode: "759100",
        },
        {
          postOffice: "Gaham B.O",
          pinCode: "759100",
        },
        {
          postOffice: "Gandamala B.O",
          pinCode: "759105",
        },
        {
          postOffice: "Garh Santiri B.O",
          pinCode: "759128",
        },
        {
          postOffice: "Garh Taras B.O",
          pinCode: "759129",
        },
        {
          postOffice: "Ghantapada B.O",
          pinCode: "759103",
        },
        {
          postOffice: "Ghosar B.O",
          pinCode: "759126",
        },
        {
          postOffice: "Gobara B.O",
          pinCode: "759103",
        },
        {
          postOffice: "Golabandha B.O",
          pinCode: "759143",
        },
        {
          postOffice: "Gopalprasad B.O",
          pinCode: "759103",
        },
        {
          postOffice: "Gotamara B.O",
          pinCode: "759128",
        },
        {
          postOffice: "Gurujang B.O",
          pinCode: "759100",
        },
        {
          postOffice: "Hakimpada S.O",
          pinCode: "759143",
        },
        {
          postOffice: "Hamamira B.O",
          pinCode: "759129",
        },
        {
          postOffice: "Handapa B.O",
          pinCode: "759127",
        },
        {
          postOffice: "Handidhua B.O",
          pinCode: "759100",
        },
        {
          postOffice: "Hensamul B.O",
          pinCode: "759103",
        },
        {
          postOffice: "Himitira B.O",
          pinCode: "759126",
        },
        {
          postOffice: "Hulurisinga S.O",
          pinCode: "759132",
        },
        {
          postOffice: "Injidi B.O",
          pinCode: "759118",
        },
        {
          postOffice: "Inkarabandha B.O",
          pinCode: "759129",
        },
        {
          postOffice: "Jagannathpur B.O",
          pinCode: "759104",
        },
        {
          postOffice: "Jagannathpur B.O",
          pinCode: "759132",
        },
        {
          postOffice: "Jamardihi B.O",
          pinCode: "759119",
        },
        {
          postOffice: "Jamudoli B.O",
          pinCode: "759125",
        },
        {
          postOffice: "Jarada B.O",
          pinCode: "759127",
        },
        {
          postOffice: "Jarada B.O",
          pinCode: "759117",
        },
        {
          postOffice: "Jarapada B.O",
          pinCode: "759127",
        },
        {
          postOffice: "Jarasingha B.O",
          pinCode: "759143",
        },
        {
          postOffice: "Jeranga Dehuri Sahi B.O",
          pinCode: "759127",
        },
        {
          postOffice: "Jharabeda B.O",
          pinCode: "759119",
        },
        {
          postOffice: "Jindal Nagar S.O",
          pinCode: "759111",
        },
        {
          postOffice: "Kadalimunda B.O",
          pinCode: "759126",
        },
        {
          postOffice: "Kakudia B.O",
          pinCode: "759117",
        },
        {
          postOffice: "Kalamchhuin B.O",
          pinCode: "759103",
        },
        {
          postOffice: "Kalandapal B.O",
          pinCode: "759128",
        },
        {
          postOffice: "Kalyanpur B.O",
          pinCode: "759126",
        },
        {
          postOffice: "Kampala B.O",
          pinCode: "759125",
        },
        {
          postOffice: "Kampsala B.O",
          pinCode: "759130",
        },
        {
          postOffice: "Kanaloi B.O",
          pinCode: "759141",
        },
        {
          postOffice: "Kandasar B.O",
          pinCode: "759145",
        },
        {
          postOffice: "Kandhalo B.O",
          pinCode: "759100",
        },
        {
          postOffice: "Kandhapada B.O",
          pinCode: "759125",
        },
        {
          postOffice: "Kangula B.O",
          pinCode: "759132",
        },
        {
          postOffice: "Kaniha S.O",
          pinCode: "759117",
        },
        {
          postOffice: "Kankili B.O",
          pinCode: "759100",
        },
        {
          postOffice: "Kansamunda B.O",
          pinCode: "759117",
        },
        {
          postOffice: "Kantapada B.O",
          pinCode: "759125",
        },
        {
          postOffice: "Kanteikolia B.O",
          pinCode: "759127",
        },
        {
          postOffice: "Kantiapasi B.O",
          pinCode: "759100",
        },
        {
          postOffice: "Karadagadia B.O",
          pinCode: "759132",
        },
        {
          postOffice: "Karadapal B.O",
          pinCode: "759119",
        },
        {
          postOffice: "Karnapur B.O",
          pinCode: "759103",
        },
        {
          postOffice: "Katada B.O",
          pinCode: "759127",
        },
        {
          postOffice: "Khalari B.O",
          pinCode: "759132",
        },
        {
          postOffice: "Khalibereni B.O",
          pinCode: "759128",
        },
        {
          postOffice: "Khamar S.O",
          pinCode: "759118",
        },
        {
          postOffice: "Khandahatta B.O",
          pinCode: "759132",
        },
        {
          postOffice: "Khemla B.O",
          pinCode: "759119",
        },
        {
          postOffice: "Khinda B.O",
          pinCode: "759129",
        },
        {
          postOffice: "Kiakata B.O",
          pinCode: "759126",
        },
        {
          postOffice: "Kishoreganj S.O",
          pinCode: "759127",
        },
        {
          postOffice: "Korada B.O",
          pinCode: "759127",
        },
        {
          postOffice: "Kosala S.O",
          pinCode: "759130",
        },
        {
          postOffice: "Kothabhuin B.O",
          pinCode: "759127",
        },
        {
          postOffice: "Krutibaspur B.O",
          pinCode: "759125",
        },
        {
          postOffice: "Kudugaon B.O",
          pinCode: "759125",
        },
        {
          postOffice: "Kuio B.O",
          pinCode: "759123",
        },
        {
          postOffice: "Kukudang B.O",
          pinCode: "759123",
        },
        {
          postOffice: "Kukurpeta B.O",
          pinCode: "759124",
        },
        {
          postOffice: "Kulad B.O",
          pinCode: "759145",
        },
        {
          postOffice: "Kulei B.O",
          pinCode: "759146",
        },
        {
          postOffice: "Kuluma B.O",
          pinCode: "759105",
        },
        {
          postOffice: "Kumanda B.O",
          pinCode: "759143",
        },
        {
          postOffice: "Kumunda B.O",
          pinCode: "759103",
        },
        {
          postOffice: "Kumursinga B.O",
          pinCode: "759129",
        },
        {
          postOffice: "Kunjam B.O",
          pinCode: "759118",
        },
        {
          postOffice: "Kurudol B.O",
          pinCode: "759123",
        },
        {
          postOffice: "Luhamunda B.O",
          pinCode: "759127",
        },
        {
          postOffice: "Luhasinga B.O",
          pinCode: "759125",
        },
        {
          postOffice: "Lunahandi B.O",
          pinCode: "759125",
        },
        {
          postOffice: "Machhakuta B.O",
          pinCode: "759124",
        },
        {
          postOffice: "Madhapur B.O",
          pinCode: "759125",
        },
        {
          postOffice: "Maimura B.O",
          pinCode: "759125",
        },
        {
          postOffice: "Manapur B.O",
          pinCode: "759129",
        },
        {
          postOffice: "Munduribeda B.O",
          pinCode: "759118",
        },
        {
          postOffice: "Nagaon B.O",
          pinCode: "759125",
        },
        {
          postOffice: "Nagira B.O",
          pinCode: "759119",
        },
        {
          postOffice: "Nakchi B.O",
          pinCode: "759126",
        },
        {
          postOffice: "Nalam B.O",
          pinCode: "759117",
        },
        {
          postOffice: "Nalconagar S.O",
          pinCode: "759145",
        },
        {
          postOffice: "Nandapur B.O",
          pinCode: "759132",
        },
        {
          postOffice: "Natada B.O",
          pinCode: "759123",
        },
        {
          postOffice: "Nehru Satabdi Nagar(Bharatpu)r S.O",
          pinCode: "759148",
        },
        {
          postOffice: "Nisha B.O",
          pinCode: "759130",
        },
        {
          postOffice: "Nuagaon B.O",
          pinCode: "759141",
        },
        {
          postOffice: "Nuahata B.O",
          pinCode: "759128",
        },
        {
          postOffice: "Nuakheta B.O",
          pinCode: "759129",
        },
        {
          postOffice: "Nuapada B.O",
          pinCode: "759124",
        },
        {
          postOffice: "Odasha B.O",
          pinCode: "759118",
        },
        {
          postOffice: "Oskapalli B.O",
          pinCode: "759126",
        },
        {
          postOffice: "P.T.C. Angul S.O",
          pinCode: "759123",
        },
        {
          postOffice: "Padmabatipur B.O",
          pinCode: "759103",
        },
        {
          postOffice: "Paiksahi B.O",
          pinCode: "759125",
        },
        {
          postOffice: "Pallahara S.O",
          pinCode: "759119",
        },
        {
          postOffice: "Papsara B.O",
          pinCode: "759127",
        },
        {
          postOffice: "Para B.O",
          pinCode: "759127",
        },
        {
          postOffice: "Parabil B.O",
          pinCode: "759100",
        },
        {
          postOffice: "Parang B.O",
          pinCode: "759143",
        },
        {
          postOffice: "Paratara B.O",
          pinCode: "759132",
        },
        {
          postOffice: "Patakumunda B.O",
          pinCode: "759141",
        },
        {
          postOffice: "Patrapada B.O",
          pinCode: "759141",
        },
        {
          postOffice: "Pedipathar B.O",
          pinCode: "759127",
        },
        {
          postOffice: "Phapanda B.O",
          pinCode: "759119",
        },
        {
          postOffice: "Pipalabahal B.O",
          pinCode: "759141",
        },
        {
          postOffice: "Podagarh B.O",
          pinCode: "759105",
        },
        {
          postOffice: "Podapada B.O",
          pinCode: "759124",
        },
        {
          postOffice: "Poipal B.O",
          pinCode: "759117",
        },
        {
          postOffice: "Pokatunga B.O",
          pinCode: "759129",
        },
        {
          postOffice: "Puruna Manitiri B.O",
          pinCode: "759125",
        },
        {
          postOffice: "Purunagarh B.O",
          pinCode: "759132",
        },
        {
          postOffice: "Purunakote B.O",
          pinCode: "759132",
        },
        {
          postOffice: "Radharamanpur B.O",
          pinCode: "759100",
        },
        {
          postOffice: "Raijharan B.O",
          pinCode: "759130",
        },
        {
          postOffice: "Rainali B.O",
          pinCode: "759125",
        },
        {
          postOffice: "Rajdang B.O",
          pinCode: "759118",
        },
        {
          postOffice: "Rajkishorenagar S.O",
          pinCode: "759126",
        },
        {
          postOffice: "Raniakata B.O",
          pinCode: "759126",
        },
        {
          postOffice: "Rantalei B.O",
          pinCode: "759132",
        },
        {
          postOffice: "Rengali B.O",
          pinCode: "759105",
        },
        {
          postOffice: "Rengali Dam Site S.O",
          pinCode: "759105",
        },
        {
          postOffice: "Sahara Gurjang B.O",
          pinCode: "759119",
        },
        {
          postOffice: "Saida B.O",
          pinCode: "759119",
        },
        {
          postOffice: "Sakasingha B.O",
          pinCode: "759123",
        },
        {
          postOffice: "Samal B.O",
          pinCode: "759100",
        },
        {
          postOffice: "Samal Barrage Township S.O",
          pinCode: "759037",
        },
        {
          postOffice: "Sanahulla B.O",
          pinCode: "759125",
        },
        {
          postOffice: "Sanatribida B.O",
          pinCode: "759117",
        },
        {
          postOffice: "Sanjamura B.O",
          pinCode: "759126",
        },
        {
          postOffice: "Sankapur B.O",
          pinCode: "759129",
        },
        {
          postOffice: "Sankhamur B.O",
          pinCode: "759118",
        },
        {
          postOffice: "Santarabandha B.O",
          pinCode: "759130",
        },
        {
          postOffice: "Santhapada B.O",
          pinCode: "759104",
        },
        {
          postOffice: "Sapoinali B.O",
          pinCode: "759141",
        },
        {
          postOffice: "Saradhapur B.O",
          pinCode: "759132",
        },
        {
          postOffice: "Saradhapur B.O",
          pinCode: "759100",
        },
        {
          postOffice: "Seegarh B.O",
          pinCode: "759119",
        },
        {
          postOffice: "Seepur B.O",
          pinCode: "759100",
        },
        {
          postOffice: "Siarimalia B.O",
          pinCode: "759119",
        },
        {
          postOffice: "Solada B.O",
          pinCode: "759103",
        },
        {
          postOffice: "Tainsi B.O",
          pinCode: "759127",
        },
        {
          postOffice: "Talagarh B.O",
          pinCode: "759129",
        },
        {
          postOffice: "Talcher R.S. B.O",
          pinCode: "759100",
        },
        {
          postOffice: "Talcher S.O",
          pinCode: "759100",
        },
        {
          postOffice: "Talcher Thermal S.O",
          pinCode: "759101",
        },
        {
          postOffice: "Talcher Town S.O",
          pinCode: "759107",
        },
        {
          postOffice: "Talmul S.O",
          pinCode: "759040",
        },
        {
          postOffice: "Tangiri B.O",
          pinCode: "759141",
        },
        {
          postOffice: "Tapdhol B.O",
          pinCode: "759127",
        },
        {
          postOffice: "Tentulei B.O",
          pinCode: "759103",
        },
        {
          postOffice: "Tentuloi B.O",
          pinCode: "759124",
        },
        {
          postOffice: "Thakurgarh B.O",
          pinCode: "759125",
        },
        {
          postOffice: "Tikarapada B.O",
          pinCode: "759132",
        },
        {
          postOffice: "Tubey B.O",
          pinCode: "759132",
        },
        {
          postOffice: "Tukuda B.O",
          pinCode: "759127",
        },
        {
          postOffice: "Tulasipal B.O",
          pinCode: "759128",
        },
        {
          postOffice: "Turang B.O",
          pinCode: "759123",
        },
        {
          postOffice: "Tusar B.O",
          pinCode: "759126",
        },
        {
          postOffice: "Ugi B.O",
          pinCode: "759127",
        },
        {
          postOffice: "Urukela B.O",
          pinCode: "759126",
        },
        {
          postOffice: "Vikrampur S.O",
          pinCode: "759106",
        },
      ],
      Bargarh: [
        {
          postOffice: "Adagaon B.O",
          pinCode: "768040",
        },
        {
          postOffice: "Agalpur B.O",
          pinCode: "768029",
        },
        {
          postOffice: "Areigudi B.O",
          pinCode: "768104",
        },
        {
          postOffice: "Arjunda B.O",
          pinCode: "768103",
        },
        {
          postOffice: "Attabira S.",
          pinCode: "768027",
        },
        {
          postOffice: "B. Katapali B.O",
          pinCode: "768038",
        },
        {
          postOffice: "B. Tileimal B.O",
          pinCode: "768029",
        },
        {
          postOffice: "Babebira B.O",
          pinCode: "768027",
        },
        {
          postOffice: "Badabrahmani PSSK B.O",
          pinCode: "768032",
        },
        {
          postOffice: "Badapali B.O",
          pinCode: "768032",
        },
        {
          postOffice: "Baddausen B.O",
          pinCode: "768032",
        },
        {
          postOffice: "Badikata B.O",
          pinCode: "768036",
        },
        {
          postOffice: "Bagbadi B.O",
          pinCode: "768029",
        },
        {
          postOffice: "Bakti B.O",
          pinCode: "768103",
        },
        {
          postOffice: "Banda B.O",
          pinCode: "768038",
        },
        {
          postOffice: "Banda-kharmunda B.O",
          pinCode: "768038",
        },
        {
          postOffice: "Bandhapali B.O",
          pinCode: "768032",
        },
        {
          postOffice: "Banhar B.O",
          pinCode: "768027",
        },
        {
          postOffice: "Banjipali B.O",
          pinCode: "768052",
        },
        {
          postOffice: "Bara B.O",
          pinCode: "768045",
        },
        {
          postOffice: "Baramkela B.O",
          pinCode: "768104",
        },
        {
          postOffice: "Barapadar B.O",
          pinCode: "768104",
        },
        {
          postOffice: "Bardol S.O (Bargarh)",
          pinCode: "768038",
        },
        {
          postOffice: "Bargarh Bazar S.O",
          pinCode: "768028",
        },
        {
          postOffice: "Bargarh Court S.O",
          pinCode: "768028",
        },
        {
          postOffice: "Bargarh H.O",
          pinCode: "768028",
        },
        {
          postOffice: "Bargarh-bargaon B.O",
          pinCode: "768038",
        },
        {
          postOffice: "Barguda PSSK B.O",
          pinCode: "768029",
        },
        {
          postOffice: "Barhaguda B.O",
          pinCode: "768040",
        },
        {
          postOffice: "Barihapali PSSK B.O",
          pinCode: "768049",
        },
        {
          postOffice: "Barpali S.O",
          pinCode: "768029",
        },
        {
          postOffice: "Bartunda B.O",
          pinCode: "768039",
        },
        {
          postOffice: "Bausenmura B.O",
          pinCode: "768033",
        },
        {
          postOffice: "Behera B.O",
          pinCode: "768029",
        },
        {
          postOffice: "Beherapali B.O",
          pinCode: "768038",
        },
        {
          postOffice: "Bhadigaon B.O",
          pinCode: "768038",
        },
        {
          postOffice: "Bhainatora B.O",
          pinCode: "768045",
        },
        {
          postOffice: "Bhainsadhara B.O",
          pinCode: "768042",
        },
        {
          postOffice: "Bhandarpuri B.O",
          pinCode: "768042",
        },
        {
          postOffice: "Bhatigaon B.O",
          pinCode: "768029",
        },
        {
          postOffice: "Bhatli S.O",
          pinCode: "768030",
        },
        {
          postOffice: "Bhatli-badmal B.O",
          pinCode: "768030",
        },
        {
          postOffice: "Bheden S.O",
          pinCode: "768104",
        },
        {
          postOffice: "Bhengrajpur B.O",
          pinCode: "768039",
        },
        {
          postOffice: "Bheunria B.O",
          pinCode: "768036",
        },
        {
          postOffice: "Bhoipali B.O",
          pinCode: "768103",
        },
        {
          postOffice: "Bhubaneswarpur B.O",
          pinCode: "768039",
        },
        {
          postOffice: "Bhukta S.O",
          pinCode: "768045",
        },
        {
          postOffice: "Bichuan B.O",
          pinCode: "768030",
        },
        {
          postOffice: "Bijadhol B.O",
          pinCode: "768042",
        },
        {
          postOffice: "Bijayapali B.O",
          pinCode: "768029",
        },
        {
          postOffice: "Bijepur S.O",
          pinCode: "768032",
        },
        {
          postOffice: "Bilaspur B.O",
          pinCode: "768042",
        },
        {
          postOffice: "Birjam B.O",
          pinCode: "768034",
        },
        {
          postOffice: "Birmal B.O",
          pinCode: "768029",
        },
        {
          postOffice: "Bisipali B.O",
          pinCode: "768049",
        },
        {
          postOffice: "Boden B.O",
          pinCode: "768036",
        },
        {
          postOffice: "Budamal B.O",
          pinCode: "768036",
        },
        {
          postOffice: "Bugbuga B.O",
          pinCode: "768027",
        },
        {
          postOffice: "Burda B.O",
          pinCode: "768103",
        },
        {
          postOffice: "Burkel B.O",
          pinCode: "768036",
        },
        {
          postOffice: "Chadeigaon B.O",
          pinCode: "768030",
        },
        {
          postOffice: "Chakarkend B.O",
          pinCode: "768033",
        },
        {
          postOffice: "Chandibhata B.O",
          pinCode: "768042",
        },
        {
          postOffice: "Chandipali PSSK B.",
          pinCode: "768038",
        },
        {
          postOffice: "Chantipali B.O",
          pinCode: "768035",
        },
        {
          postOffice: "Chendeikela B.O",
          pinCode: "768050",
        },
        {
          postOffice: "Chhetgaon PSSK B.O",
          pinCode: "768039",
        },
        {
          postOffice: "Chhuriapali B.O",
          pinCode: "768033",
        },
        {
          postOffice: "Chichinda B.O",
          pinCode: "768104",
        },
        {
          postOffice: "Chichinda B.O",
          pinCode: "768033",
        },
        {
          postOffice: "Chikhili PSSK B.O",
          pinCode: "768037",
        },
        {
          postOffice: "Dahigaon B.O",
          pinCode: "768036",
        },
        {
          postOffice: "Dahita B.O",
          pinCode: "768036",
        },
        {
          postOffice: "Dang B.O",
          pinCode: "768038",
        },
        {
          postOffice: "Dangabahal B.O",
          pinCode: "768037",
        },
        {
          postOffice: "Dekulba B.O",
          pinCode: "768103",
        },
        {
          postOffice: "Deogaon B.O",
          pinCode: "768038",
        },
        {
          postOffice: "Deshbhatli B.O",
          pinCode: "768102",
        },
        {
          postOffice: "Dhaba B.O",
          pinCode: "768042",
        },
        {
          postOffice: "Dhanger B.O",
          pinCode: "768040",
        },
        {
          postOffice: "Diptipur B.O",
          pinCode: "768035",
        },
        {
          postOffice: "Dulampur B.O",
          pinCode: "768111",
        },
        {
          postOffice: "Dungri B.O",
          pinCode: "768052",
        },
        {
          postOffice: "Dunguri Lsq Colony Campus S.O",
          pinCode: "768052",
        },
        {
          postOffice: "Firingimal PSSK B.O",
          pinCode: "768037",
        },
        {
          postOffice: "Gaisama B.O",
          pinCode: "768040",
        },
        {
          postOffice: "Gaisilet S.O",
          pinCode: "768037",
        },
        {
          postOffice: "Ganiapali B.O",
          pinCode: "768049",
        },
        {
          postOffice: "Garbhona B.O",
          pinCode: "768033",
        },
        {
          postOffice: "Ghess S.O",
          pinCode: "768034",
        },
        {
          postOffice: "Godbhaga S.O",
          pinCode: "768111",
        },
        {
          postOffice: "Gondturum S.O",
          pinCode: "768115",
        },
        {
          postOffice: "Gopalpur B.O",
          pinCode: "768030",
        },
        {
          postOffice: "Gopeipali B.O",
          pinCode: "768029",
        },
        {
          postOffice: "Gourenmunda B.O",
          pinCode: "768037",
        },
        {
          postOffice: "Gourmal B.O",
          pinCode: "768042",
        },
        {
          postOffice: "Govindpur B.O",
          pinCode: "768033",
        },
        {
          postOffice: "Guderpali B.O",
          pinCode: "768035",
        },
        {
          postOffice: "Gudesira B.O",
          pinCode: "768038",
        },
        {
          postOffice: "Gunthiapali PSSK B.O",
          pinCode: "768032",
        },
        {
          postOffice: "Guthuguda B.O",
          pinCode: "768042",
        },
        {
          postOffice: "Halupali B.O",
          pinCode: "768038",
        },
        {
          postOffice: "Hatisar B.O",
          pinCode: "768030",
        },
        {
          postOffice: "Hirlipali B.O",
          pinCode: "768027",
        },
        {
          postOffice: "J. Sirgida B.O",
          pinCode: "768033",
        },
        {
          postOffice: "Jagalpat B.O",
          pinCode: "768037",
        },
        {
          postOffice: "Jagdalpur B.O",
          pinCode: "768036",
        },
        {
          postOffice: "Jamla S.O",
          pinCode: "768049",
        },
        {
          postOffice: "Jamseth B.O",
          pinCode: "768050",
        },
        {
          postOffice: "Jamurda B.O",
          pinCode: "768038",
        },
        {
          postOffice: "Jamutbahal B.O",
          pinCode: "768037",
        },
        {
          postOffice: "Janged B.O",
          pinCode: "768027",
        },
        {
          postOffice: "Janhapada B.O",
          pinCode: "768027",
        },
        {
          postOffice: "Jaring B.O",
          pinCode: "768032",
        },
        {
          postOffice: "Jatla B.O",
          pinCode: "768033",
        },
        {
          postOffice: "Jhar B.O",
          pinCode: "768034",
        },
        {
          postOffice: "Jharbandh S.O",
          pinCode: "768042",
        },
        {
          postOffice: "Jharpali B.O",
          pinCode: "768103",
        },
        {
          postOffice: "Jharpali B.O",
          pinCode: "768034",
        },
        {
          postOffice: "Jhikijhiki B.O",
          pinCode: "768030",
        },
        {
          postOffice: "Jhilminda B.O",
          pinCode: "768103",
        },
        {
          postOffice: "Jhitiki B.O",
          pinCode: "768050",
        },
        {
          postOffice: "Jokhipali B.O",
          pinCode: "768048",
        },
        {
          postOffice: "K. Katabahal B.O",
          pinCode: "768036",
        },
        {
          postOffice: "Kadobahal B.O",
          pinCode: "768102",
        },
        {
          postOffice: "Kainsir B.O",
          pinCode: "768029",
        },
        {
          postOffice: "Kalangapali B.O",
          pinCode: "768034",
        },
        {
          postOffice: "Kalapani B.O",
          pinCode: "768040",
        },
        {
          postOffice: "Kamgaon B.O",
          pinCode: "768038",
        },
        {
          postOffice: "Kanakbira B.O",
          pinCode: "768030",
        },
        {
          postOffice: "Kanbar PSSK B.O",
          pinCode: "768028",
        },
        {
          postOffice: "Kandapala B.O",
          pinCode: "768030",
        },
        {
          postOffice: "Kangaon B.O",
          pinCode: "768033",
        },
        {
          postOffice: "Kansada PSSK B.O",
          pinCode: "768050",
        },
        {
          postOffice: "Kansingha B.O",
          pinCode: "768036",
        },
        {
          postOffice: "Kantapali-barpali B.O",
          pinCode: "768029",
        },
        {
          postOffice: "Kapasira B.O",
          pinCode: "768045",
        },
        {
          postOffice: "Karanda PSSK B.O",
          pinCode: 76802,
        },
        {
          postOffice: "Karlasantara B.O",
          pinCode: 768052,
        },
        {
          postOffice: "Kathaumal B.O",
          pinCode: 768037,
        },
        {
          postOffice: "Kebad B.O",
          pinCode: 768029,
        },
        {
          postOffice: "Kechhdadar PSSK B.O",
          pinCode: 768039,
        },
        {
          postOffice: "Kermelabahal PSSK B.O",
          pinCode: 768039,
        },
        {
          postOffice: "Kesaipali B.O",
          pinCode: 768030,
        },
        {
          postOffice: "Khaliapali B.O",
          pinCode: 768036,
        },
        {
          postOffice: "Khandatha B.O",
          pinCode: 768040,
        },
        {
          postOffice: "Kharmunda B.O",
          pinCode: 768032,
        },
        {
          postOffice: "Kharsal B.O",
          pinCode: 768030,
        },
        {
          postOffice: "Khemsara PSSK B.O",
          pinCode: 768029,
        },
        {
          postOffice: "Khuntapali B.O",
          pinCode: 768040,
        },
        {
          postOffice: "Kubedega B.O",
          pinCode: 768104,
        },
        {
          postOffice: "Kuchipali B.O",
          pinCode: 768034,
        },
        {
          postOffice: "Kudapali B.O",
          pinCode: 768104,
        },
        {
          postOffice: "Kultatukura B.O",
          pinCode: 768102,
        },
        {
          postOffice: "Kulunda B.O",
          pinCode: 768027,
        },
        {
          postOffice: "Kumbhari B.O",
          pinCode: 768029,
        },
        {
          postOffice: "Kumbho B.O",
          pinCode: 768045,
        },
        {
          postOffice: "Kumelsingha B.O",
          pinCode: 768111,
        },
        {
          postOffice: "Kumir PSSK B.O",
          pinCode: 768042,
        },
        {
          postOffice: "Kundakhai B.O",
          pinCode: 768035,
        },
        {
          postOffice: "Kuruan B.O",
          pinCode: 768103,
        },
        {
          postOffice: "Kusanpuri B.O",
          pinCode: 768029,
        },
        {
          postOffice: "Lachida B.O",
          pinCode: 768027,
        },
        {
          postOffice: "Lahanda B.O",
          pinCode: 768111,
        },
        {
          postOffice: "Lakhamara B.O",
          pinCode: 768036,
        },
        {
          postOffice: "Lakhanpur B.O",
          pinCode: 768052,
        },
        {
          postOffice: "Larambha S.O",
          pinCode: 768102,
        },
        {
          postOffice: "Larasara B.O",
          pinCode: 768027,
        },
        {
          postOffice: "Lastala B.O",
          pinCode: 768027,
        },
        {
          postOffice: "Laudidhara B.O",
          pinCode: 768042,
        },
        {
          postOffice: "Laumunda S.O",
          pinCode: 768048,
        },
        {
          postOffice: "Lebidi B.O",
          pinCode: 768033,
        },
        {
          postOffice: "Lenda B.O",
          pinCode: 768029,
        },
        {
          postOffice: "Lupursingha B.O",
          pinCode: 768103,
        },
        {
          postOffice: "Madhupur B.O",
          pinCode: 768033,
        },
        {
          postOffice: "Mahada B.O",
          pinCode: 768029,
        },
        {
          postOffice: "Mahule B.O",
          pinCode: 768115,
        },
        {
          postOffice: "Mahulpali B.O",
          pinCode: 768036,
        },
        {
          postOffice: "Mahulpali B.O",
          pinCode: 768029,
        },
        {
          postOffice: "Majhipali B.O",
          pinCode: 768048,
        },
        {
          postOffice: "Manapada B.O",
          pinCode: 768027,
        },
        {
          postOffice: "Mandosil S.O",
          pinCode: 768050,
        },
        {
          postOffice: "Manpur B.O",
          pinCode: 768104,
        },
        {
          postOffice: "Melchhamunda S.O",
          pinCode: 768035,
        },
        {
          postOffice: "Mithapali B.O",
          pinCode: 768039,
        },
        {
          postOffice: "Mondiadhipa B.O",
          pinCode: 768039,
        },
        {
          postOffice: "Mulbar B.O",
          pinCode: 768030,
        },
        {
          postOffice: "N. Jampali B.O",
          pinCode: 768038,
        },
        {
          postOffice: "Negimunda B.O",
          pinCode: 768033,
        },
        {
          postOffice: "Nileswar B.O",
          pinCode: 768029,
        },
        {
          postOffice: "Nilji B.O",
          pinCode: 768030,
        },
        {
          postOffice: "Nuagarh B.O",
          pinCode: 768030,
        },
        {
          postOffice: "Pada B.O",
          pinCode: 768032,
        },
        {
          postOffice: "Pahandi B.O",
          pinCode: 768032,
        },
        {
          postOffice: "Paharsirgida B.O",
          pinCode: 768027,
        },
        {
          postOffice: "Paikmal S.O",
          pinCode: 768039,
        },
        {
          postOffice: "Palsada B.O",
          pinCode: 768039,
        },
        {
          postOffice: "Pandikipali B.O",
          pinCode: 768033,
        },
        {
          postOffice: "Panimura B.O",
          pinCode: 768033,
        },
        {
          postOffice: "Papanga B.O",
          pinCode: 768104,
        },
        {
          postOffice: "Patakulunda B.O",
          pinCode: 768029,
        },
        {
          postOffice: "Patharia B.O",
          pinCode: 768032,
        },
        {
          postOffice: "Petupali B.O",
          pinCode: 768034,
        },
        {
          postOffice: "Phalsapali B.O",
          pinCode: 768049,
        },
        {
          postOffice: "Purena B.O",
          pinCode: 768036,
        },
        {
          postOffice: "Raisalpadar PSSK B.O",
          pinCode: 768037,
        },
        {
          postOffice: "Rajborasamber S.O",
          pinCode: 768036,
        },
        {
          postOffice: "Remta B.O",
          pinCode: 768029,
        },
        {
          postOffice: "Remunda S.O",
          pinCode: 768103,
        },
        {
          postOffice: "Rengali B.O",
          pinCode: 768033,
        },
        {
          postOffice: "Rengalipali Colony B.O",
          pinCode: 768027,
        },
        {
          postOffice: "Resam B.O",
          pinCode: 768104,
        },
        {
          postOffice: "Routpara B.O",
          pinCode: 768030,
        },
        {
          postOffice: "Ruchida B.O",
          pinCode: 768045,
        },
        {
          postOffice: "Rusuda B.O",
          pinCode: 768115,
        },
        {
          postOffice: "S. Dumberpali PSSK B.O",
          pinCode: 768029,
        },
        {
          postOffice: "Saipali B.O",
          pinCode: 768032,
        },
        {
          postOffice: "Sakuda B.O",
          pinCode: 768030,
        },
        {
          postOffice: "Salepali B.O",
          pinCode: 768035,
        },
        {
          postOffice: "Samalaipadar B.O",
          pinCode: 768032,
        },
        {
          postOffice: "Sanimal B.O",
          pinCode: 768034,
        },
        {
          postOffice: "Sankhirda B.O",
          pinCode: 768103,
        },
        {
          postOffice: "Saplahar B.O",
          pinCode: 768036,
        },
        {
          postOffice: "Saradhapali B.O",
          pinCode: 768037,
        },
        {
          postOffice: "Saranda B.O",
          pinCode: 768027,
        },
        {
          postOffice: "Sarandapali B.O",
          pinCode: 768032,
        },
        {
          postOffice: "Sareikela B.O",
          pinCode: 768036,
        },
        {
          postOffice: "Sargibahal B.O",
          pinCode: 768049,
        },
        {
          postOffice: "Sarkanda B.O",
          pinCode: 768033,
        },
        {
          postOffice: "Sarsara B.O",
          pinCode: 768040,
        },
        {
          postOffice: "Satlama B.O",
          pinCode: 768029,
        },
        {
          postOffice: "Shakti B.O",
          pinCode: 768042,
        },
        {
          postOffice: "Sialkhandata B.O",
          pinCode: 768115,
        },
        {
          postOffice: "Silet B.O",
          pinCode: 768111,
        },
        {
          postOffice: "Sirgida B.O",
          pinCode: 768032,
        },
        {
          postOffice: "Sohella S.O",
          pinCode: 768033,
        },
        {
          postOffice: "Sulsulia B.O",
          pinCode: 768030,
        },
        {
          postOffice: "Sunalarambha B.O",
          pinCode: 768104,
        },
        {
          postOffice: "Tabada B.O",
          pinCode: 768033,
        },
        {
          postOffice: "Talmenda B.O",
          pinCode: 768103,
        },
        {
          postOffice: "Talpadar B.O",
          pinCode: 768034,
        },
        {
          postOffice: "Talpali B.O",
          pinCode: 768036,
        },
        {
          postOffice: "Talsirgida B.O",
          pinCode: 768103,
        },
        {
          postOffice: "Tamdei B.O",
          pinCode: 768052,
        },
        {
          postOffice: "Tampersara B.O",
          pinCode: 768102,
        },
        {
          postOffice: "Tejgola B.O",
          pinCode: 768030,
        },
        {
          postOffice: "Temri B.O",
          pinCode: 768039,
        },
        {
          postOffice: "Tope B.O",
          pinCode: 768027,
        },
        {
          postOffice: "Tora S.O",
          pinCode: 768040,
        },
        {
          postOffice: "Tulandi B.O",
          pinCode: 768029,
        },
        {
          postOffice: "Tumgaon PSSK B.O",
          pinCode: 768028,
        },
        {
          postOffice: "Tungibandhali B.O",
          pinCode: 768033,
        },
        {
          postOffice: "Urduna B.O",
          pinCode: 768038,
        },
        {
          postOffice: "Uttam B.O",
          pinCode: 768052,
        },
      ],
      Bhadrak: [
        {
          postOffice: "Adalpanka B.O",
          pinCode: 756114,
        },
        {
          postOffice: "Adhuan B.O",
          pinCode: 756125,
        },
        {
          postOffice: "Adia B.O",
          pinCode: 756114,
        },
        {
          postOffice: "Aharapada B.O",
          pinCode: 756128,
        },
        {
          postOffice: "Akhuapada S.O",
          pinCode: 756122,
        },
        {
          postOffice: "Alauti B.O",
          pinCode: 756113,
        },
        {
          postOffice: "Albaga B.O",
          pinCode: 756124,
        },
        {
          postOffice: "Andheipalli B.O",
          pinCode: 756112,
        },
        {
          postOffice: "Andhia B.O",
          pinCode: 756114,
        },
        {
          postOffice: "Andiapat B.O",
          pinCode: 756129,
        },
        {
          postOffice: "Andrai B.O",
          pinCode: 756123,
        },
        {
          postOffice: "Angeipal B.O",
          pinCode: 756117,
        },
        {
          postOffice: "Anijo B.O",
          pinCode: 756115,
        },
        {
          postOffice: "Apanda B.O",
          pinCode: 756144,
        },
        {
          postOffice: "Aradi S.O",
          pinCode: 756138,
        },
        {
          postOffice: "Arandua B.O",
          pinCode: 756125,
        },
        {
          postOffice: "Arasa S.O",
          pinCode: 756139,
        },
        {
          postOffice: "Arjunbindha B.O",
          pinCode: 756131,
        },
        {
          postOffice: "Arnapal S.O",
          pinCode: 756116,
        },
        {
          postOffice: "Aruha B.O",
          pinCode: 756168,
        },
        {
          postOffice: "Asurali S.O",
          pinCode: 756137,
        },
        {
          postOffice: "Atto B.O",
          pinCode: 756123,
        },
        {
          postOffice: "B T Pur S.O",
          pinCode: 756115,
        },
        {
          postOffice: "Babalpur B.O",
          pinCode: 756121,
        },
        {
          postOffice: "Bachhipur B.O",
          pinCode: 756165,
        },
        {
          postOffice: "Badabarchikayan B.O",
          pinCode: 756135,
        },
        {
          postOffice: "Badanuagaon B.O",
          pinCode: 756115,
        },
        {
          postOffice: "Bahabalpur B.O",
          pinCode: 756130,
        },
        {
          postOffice: "Bahudarada B.O",
          pinCode: 756112,
        },
        {
          postOffice: "Baincha B.O",
          pinCode: 756164,
        },
        {
          postOffice: "Balabhadrapur B.O",
          pinCode: 756116,
        },
        {
          postOffice: "Balanta B.O",
          pinCode: 756111,
        },
        {
          postOffice: "Balichaturi B.O",
          pinCode: 756130,
        },
        {
          postOffice: "Baligaon B.O",
          pinCode: 756133,
        },
        {
          postOffice: "Balimeda B.O",
          pinCode: 756131,
        },
        {
          postOffice: "Balimunda B.O",
          pinCode: 756164,
        },
        {
          postOffice: "Bamanbindha B.O",
          pinCode: 756131,
        },
        {
          postOffice: "Bamkura B.O",
          pinCode: 756119,
        },
        {
          postOffice: "Bandalo B.O",
          pinCode: 756121,
        },
        {
          postOffice: "Bandhagaon B.O",
          pinCode: 756101,
        },
        {
          postOffice: "Bandhatia B.O",
          pinCode: 756117,
        },
        {
          postOffice: "Bangarpadi B.O",
          pinCode: 756114,
        },
        {
          postOffice: "Banitia B.O",
          pinCode: 756101,
        },
        {
          postOffice: "Bansada Kuamara B.O",
          pinCode: 756164,
        },
        {
          postOffice: "Bant S.O",
          pinCode: 756114,
        },
        {
          postOffice: "Baralpokhari B.O",
          pinCode: 756101,
        },
        {
          postOffice: "Barandua B.O",
          pinCode: 756168,
        },
        {
          postOffice: "Barapada S.O",
          pinCode: 756113,
        },
        {
          postOffice: "Barikpur Bazar S.O",
          pinCode: 756112,
        },
        {
          postOffice: "Baro B.O",
          pinCode: 756130,
        },
        {
          postOffice: "Barsar B.O",
          pinCode: 756131,
        },
        {
          postOffice: "Bartana B.O",
          pinCode: 756115,
        },
        {
          postOffice: "Barunai B.O",
          pinCode: 756167,
        },
        {
          postOffice: "Basantia S.O (Bhadrak)",
          pinCode: 756144,
        },
        {
          postOffice: "Basudevpur College S.O",
          pinCode: 756125,
        },
        {
          postOffice: "Basudevpur S.O (Bhadrak)",
          pinCode: 756125,
        },
        {
          postOffice: "Batula B.O",
          pinCode: 756138,
        },
        {
          postOffice: "Bedeipur B.O",
          pinCode: 756164,
        },
        {
          postOffice: "Bedeipurpal B.O",
          pinCode: 756125,
        },
        {
          postOffice: "Begana B.O",
          pinCode: 756114,
        },
        {
          postOffice: "Bentalpur B.O",
          pinCode: 756133,
        },
        {
          postOffice: "Betada S.O",
          pinCode: 756168,
        },
        {
          postOffice: "Betaligaon B.O",
          pinCode: 756119,
        },
        {
          postOffice: "Bhadrak Banka Bazar S.O",
          pinCode: 756100,
        },
        {
          postOffice: "Bhadrak Bypass B.O",
          pinCode: 756181,
        },
        {
          postOffice: "Bhadrak College S.O",
          pinCode: 756100,
        },
        {
          postOffice: "Bhadrak Court S.O",
          pinCode: 756100,
        },
        {
          postOffice: "Bhadrak H.O",
          pinCode: 756100,
        },
        {
          postOffice: "Bhadrak Naya Bazar S.O",
          pinCode: 756100,
        },
        {
          postOffice: "Bhadrak Puruna Bazar S.O",
          pinCode: 756100,
        },
        {
          postOffice: "Bhadrak R S S.O",
          pinCode: 756101,
        },
        {
          postOffice: "Bhagibindha B.O",
          pinCode: 756112,
        },
        {
          postOffice: "Bhairabpur B.O",
          pinCode: 756125,
        },
        {
          postOffice: "Bhandari Pokhari S.O",
          pinCode: 756120,
        },
        {
          postOffice: "Bhatapada B.O",
          pinCode: 756130,
        },
        {
          postOffice: "Bhuianwash B.O",
          pinCode: 756163,
        },
        {
          postOffice: "Bhuinpur B.O",
          pinCode: 756138,
        },
        {
          postOffice: "Bidyadharpur B.O",
          pinCode: 756139,
        },
        {
          postOffice: "Bijayanagar B.O",
          pinCode: 756133,
        },
        {
          postOffice: "Bilana B.O",
          pinCode: 756163,
        },
        {
          postOffice: "Binayakpur B.O",
          pinCode: 756125,
        },
        {
          postOffice: "Biras B.O",
          pinCode: 756125,
        },
        {
          postOffice: "Biriadia B.O",
          pinCode: 756129,
        },
        {
          postOffice: "Bishnupurbindha B.O",
          pinCode: 756116,
        },
        {
          postOffice: "Bodak B.O",
          pinCode: 756163,
        },
        {
          postOffice: "Bodakpatna B.O",
          pinCode: 756135,
        },
        {
          postOffice: "Bouljoda B.O",
          pinCode: 756133,
        },
        {
          postOffice: "Brahmanigaon S.O",
          pinCode: 756165,
        },
        {
          postOffice: "Brahmanpal B.O",
          pinCode: 756119,
        },
        {
          postOffice: "Chabispara Sasan B.O",
          pinCode: 756130,
        },
        {
          postOffice: "Chalunigaon B.O",
          pinCode: 756168,
        },
        {
          postOffice: "Champulipada B.O",
          pinCode: 756111,
        },
        {
          postOffice: "Chandbali Bazar S.O",
          pinCode: 756133,
        },
        {
          postOffice: "Chandbali S.O",
          pinCode: 756133,
        },
        {
          postOffice: "Chandigaon B.O",
          pinCode: 756101,
        },
        {
          postOffice: "Chandrakat Bindha B.O",
          pinCode: 75613, // Assuming this should be 756133 instead of 75613
        },
        {
          postOffice: "Charampa S.O",
          pinCode: 756101,
        },
        {
          postOffice: "Chardia B.O",
          pinCode: 756132,
        },
        {
          postOffice: "Chardia B.O",
          pinCode: 756113,
        },
        {
          postOffice: "Chhayalsingh B.O",
          pinCode: 756114,
        },
        {
          postOffice: "Chudakuti Palasa B.O",
          pinCode: 756117,
        },
        {
          postOffice: "Chudamani B.O",
          pinCode: 756125,
        },
        {
          postOffice: "D.B. Colony B.O",
          pinCode: 756117,
        },
        {
          postOffice: "Dakhinabad B.O",
          pinCode: 756117,
        },
        {
          postOffice: "Deopada B.O",
          pinCode: 756121,
        },
        {
          postOffice: "Dhamara S.O",
          pinCode: 756171,
        },
        {
          postOffice: "Dhamnagar S.O",
          pinCode: 756117,
        },
        {
          postOffice: "Dhulipada B.O",
          pinCode: 756130,
        },
        {
          postOffice: "Dhusuri S.O",
          pinCode: 756119,
        },
        {
          postOffice: "Dobal B.O",
          pinCode: 756117,
        },
        {
          postOffice: "Dolapadi B.O",
          pinCode: 756114,
        },
        {
          postOffice: "Dolasahi S.O",
          pinCode: 756127,
        },
        {
          postOffice: "Dosinga B.O",
          pinCode: 756171,
        },
        {
          postOffice: "Erada B.O",
          pinCode: 756123,
        },
        {
          postOffice: "Eram S.O",
          pinCode: 756162,
        },
        {
          postOffice: "Ertal S.O",
          pinCode: 756124,
        },
        {
          postOffice: "Fatepur B.O",
          pinCode: 756137,
        },
        {
          postOffice: "Gadiali B.O",
          pinCode: 756137,
        },
        {
          postOffice: "Galagandapur B.O",
          pinCode: 756163,
        },
        {
          postOffice: "Ganijang B.O",
          pinCode: 756114,
        },
        {
          postOffice: "Ganjeibari B.O",
          pinCode: 756127,
        },
        {
          postOffice: "Garadapur B.O",
          pinCode: 756181,
        },
        {
          postOffice: "Gelpur B.O",
          pinCode: 756181,
        },
        {
          postOffice: "Geltua B.O",
          pinCode: 756181,
        },
        {
          postOffice: "Ghanteswar Baliapal B.O",
          pinCode: 756129,
        },
        {
          postOffice: "Ghanteswar S.O",
          pinCode: 756129,
        },
        {
          postOffice: "Ghatapur B.O",
          pinCode: 756131,
        },
        {
          postOffice: "Ghosrabazar S.O",
          pinCode: 756100,
        },
        {
          postOffice: "Goladia B.O",
          pinCode: 756133,
        },
        {
          postOffice: "Golapokhari B.O",
          pinCode: 756130,
        },
        {
          postOffice: "Gopaljew Sugo B.O",
          pinCode: 756124,
        },
        {
          postOffice: "Gopalpur B.O",
          pinCode: 756133,
        },
        {
          postOffice: "Gopinath Tejpur B.O",
          pinCode: 756115,
        },
        {
          postOffice: "Goramati B.O",
          pinCode: 756123,
        },
        {
          postOffice: "Goudunipokhari B.O",
          pinCode: 756132,
        },
        {
          postOffice: "Gourgadi B.O",
          pinCode: 756111,
        },
        {
          postOffice: "Govindapur B.O",
          pinCode: 756137,
        },
        {
          postOffice: "Govindpur B.O",
          pinCode: 756164,
        },
        {
          postOffice: "Govindpur Hanspat B.O",
          pinCode: 756131,
        },
        {
          postOffice: "Guagadia B.O",
          pinCode: 756124,
        },
        {
          postOffice: "Guamal S.O",
          pinCode: 756163,
        },
        {
          postOffice: "Gujidarada S.O",
          pinCode: 756128,
        },
        {
          postOffice: "Haladia B.O",
          pinCode: 756129,
        },
        {
          postOffice: "Harekrishnapur B.O",
          pinCode: 756132,
        },
        {
          postOffice: "Hatapur B.O",
          pinCode: 756129,
        },
        {
          postOffice: "Hengupati B.O",
          pinCode: 756131,
        },
        {
          postOffice: "Ichhada B.O",
          pinCode: 756112,
        },
        {
          postOffice: "Ichhapur B.O",
          pinCode: 756127,
        },
        {
          postOffice: "Jahangir B.O",
          pinCode: 756117,
        },
        {
          postOffice: "Jaipur B.O",
          pinCode: 756163,
        },
        {
          postOffice: "Jalamandua B.O",
          pinCode: 756112,
        },
        {
          postOffice: "Jalanga B.O",
          pinCode: 756181,
        },
        {
          postOffice: "Jaleswarpur B.O",
          pinCode: 756132,
        },
        {
          postOffice: "Jamjodi B.O",
          pinCode: 756131,
        },
        {
          postOffice: "Jitanaga B.O",
          pinCode: 756127,
        },
        {
          postOffice: "K K Pur B.O",
          pinCode: 756125,
        },
        {
          postOffice: "Kadabaranga B.O",
          pinCode: 756135,
        },
        {
          postOffice: "Kaithkhola B.O",
          pinCode: 756171,
        },
        {
          postOffice: "Kalai B.O",
          pinCode: 756116,
        },
        {
          postOffice: "Kalasuni B.O",
          pinCode: 756111,
        },
        {
          postOffice: "Kalyani B.O",
          pinCode: 756118,
        },
        {
          postOffice: "Kandaragadia B.O",
          pinCode: 756129,
        },
        {
          postOffice: "Kanheibindha B.O",
          pinCode: 756168,
        },
        {
          postOffice: "Kanpada B.O",
          pinCode: 756130,
        },
        {
          postOffice: "Kantia B.O",
          pinCode: 756114,
        },
        {
          postOffice: "Karanjamal B.O",
          pinCode: 756164,
        },
        {
          postOffice: "Karanpalli B.O",
          pinCode: 756164,
        },
        {
          postOffice: "Karanpokhari B.",
          pinCode: 756132,
        },
        {
          postOffice: "Kasimpur B.O",
          pinCode: 756137,
        },
        {
          postOffice: "Kaupur B.O",
          pinCode: 756113,
        },
        {
          postOffice: "Kenduapada B.O",
          pinCode: 756112,
        },
        {
          postOffice: "Keshpur B.O",
          pinCode: 756128,
        },
        {
          postOffice: "Khadimahara B.O",
          pinCode: 756119,
        },
        {
          postOffice: "Khadipada B.O",
          pinCode: 756117,
        },
        {
          postOffice: "Khaparpada B.O",
          pinCode: 756116,
        },
        {
          postOffice: "Kheranga B.O",
          pinCode: 756131,
        },
        {
          postOffice: "Khirkona B.O",
          pinCode: 756168,
        },
        {
          postOffice: "Kiapada B.O",
          pinCode: 756165,
        },
        {
          postOffice: "Kishore Prasad B.O",
          pinCode: 756171,
        },
        {
          postOffice: "Kolha B.O",
          pinCode: 756130,
        },
        {
          postOffice: "Korkora B.O",
          pinCode: 756116,
        },
        {
          postOffice: "Korua B.O",
          pinCode: 756137,
        },
        {
          postOffice: "Kothar S.O",
          pinCode: 756118,
        },
        {
          postOffice: "Kuans S.O",
          pinCode: 756100,
        },
        {
          postOffice: "Kubera B.O",
          pinCode: 756163,
        },
        {
          postOffice: "Kuda B.O",
          pinCode: 756132,
        },
        {
          postOffice: "Kudabarua B.O",
          pinCode: 756101,
        },
        {
          postOffice: "Kulana B.O",
          pinCode: 756121,
        },
        {
          postOffice: "Kumbharia B.O",
          pinCode: 756122,
        },
        {
          postOffice: "Kurigaon B.O",
          pinCode: 756117,
        },
        {
          postOffice: "Langudi B.O",
          pinCode: 756116,
        },
        {
          postOffice: "Lunga B.O",
          pinCode: 756124,
        },
        {
          postOffice: "Lunia B.O",
          pinCode: 756116,
        },
        {
          postOffice: "Madhabnagar S.O",
          pinCode: 756181,
        },
        {
          postOffice: "Madhapur B.O",
          pinCode: 756132,
        },
        {
          postOffice: "Madhupur B.O",
          pinCode: 756132,
        },
        {
          postOffice: "Maitapur B.O",
          pinCode: 756111,
        },
        {
          postOffice: "Malada B.O",
          pinCode: 756120,
        },
        {
          postOffice: "Mandari B.O",
          pinCode: 756125,
        },
        {
          postOffice: "Mangalpur B.O",
          pinCode: 756130,
        },
        {
          postOffice: "Manjuri B.O",
          pinCode: 756122,
        },
        {
          postOffice: "Manjuri Road S.O",
          pinCode: 756121,
        },
        {
          postOffice: "Matiasahi B.O",
          pinCode: 756130,
        },
        {
          postOffice: "Matipaka B.O",
          pinCode: 756125,
        },
        {
          postOffice: "Mohantipada B.O",
          pinCode: 756115,
        },
        {
          postOffice: "Moharampur B.O",
          pinCode: 756127,
        },
        {
          postOffice: "Motto S.O",
          pinCode: 756132,
        },
        {
          postOffice: "Mouda B.O",
          pinCode: 756181,
        },
        {
          postOffice: "Mousudha Bazar B.O",
          pinCode: 756132,
        },
        {
          postOffice: "Mudusuli B.O",
          pinCode: 756131,
        },
        {
          postOffice: "Naami B.O",
          pinCode: 756121,
        },
        {
          postOffice: "Nadigaon B.O",
          pinCode: 756119,
        },
        {
          postOffice: "Naguan B.O",
          pinCode: 756112,
        },
        {
          postOffice: "Naikanidihi S.O",
          pinCode: 756164,
        },
        {
          postOffice: "Nalagohira B.O",
          pinCode: 756132,
        },
        {
          postOffice: "Nalanga B.O",
          pinCode: 756112,
        },
        {
          postOffice: "Nalgira B.O",
          pinCode: 756113,
        },
        {
          postOffice: "Nalgunda B.O",
          pinCode: 756132,
        },
        {
          postOffice: "Nandapur B.O",
          pinCode: 756127,
        },
        {
          postOffice: "Nandapur B.O",
          pinCode: 756138,
        },
        {
          postOffice: "Nandore B.O",
          pinCode: 756116,
        },
        {
          postOffice: "Nangamahalla S.O",
          pinCode: 756100,
        },
        {
          postOffice: "Narasinghpur B.O",
          pinCode: 756168,
        },
        {
          postOffice: "Narasinghpurhat B.O",
          pinCode: 756171,
        },
        {
          postOffice: "Narayanpur B.O",
          pinCode: 756117,
        },
        {
          postOffice: "Narendrapur B.O",
          pinCode: 756129,
        },
        {
          postOffice: "Nerada B.O",
          pinCode: 756122,
        },
        {
          postOffice: "Nuagaon B.O",
          pinCode: 756162,
        },
        {
          postOffice: "Nuagaon Ichhapur B.O",
          pinCode: 756132,
        },
        {
          postOffice: "Nuahat B.O",
          pinCode: 756118,
        },
        {
          postOffice: "Odanga B.O",
          pinCode: 756135,
        },
        {
          postOffice: "Olaga B.O",
          pinCode: 756138,
        },
        {
          postOffice: "Olanga B.O",
          pinCode: 756135,
        },
        {
          postOffice: "Orasahi B.O",
          pinCode: 756133,
        },
        {
          postOffice: "Padamapur B.O",
          pinCode: 756124,
        },
        {
          postOffice: "Padhani B.O",
          pinCode: 756117,
        },
        {
          postOffice: "Padhanpara B.O",
          pinCode: 756114,
        },
        {
          postOffice: "Paliabindha S.O",
          pinCode: 756167,
        },
        {
          postOffice: "Palikiri B.O",
          pinCode: 756117,
        },
        {
          postOffice: "Panchutikiri B.O",
          pinCode: 756129,
        },
        {
          postOffice: "Pandarbatia B.O",
          pinCode: 756119,
        },
        {
          postOffice: "Pangata B.O",
          pinCode: 756119,
        },
        {
          postOffice: "Paramanandapur B.O",
          pinCode: 756132,
        },
        {
          postOffice: "Paramanandapur B.O",
          pinCode: 756122,
        },
        {
          postOffice: "Patnamishrapur B.O",
          pinCode: 756130,
        },
        {
          postOffice: "Patuli B.O",
          pinCode: 756112,
        },
        {
          postOffice: "Pirahatbazar S.O",
          pinCode: 756131,
        },
        {
          postOffice: "Pirhat B.O",
          pinCode: 756131,
        },
        {
          postOffice: "Piripur B.O",
          pinCode: 756112,
        },
        {
          postOffice: "Prabodhpur S.O",
          pinCode: 756125,
        },
        {
          postOffice: "R N Betra B.O",
          pinCode: 756112,
        },
        {
          postOffice: "Radhaballavpur B.O",
          pinCode: 756125,
        },
        {
          postOffice: "Rahania B.O",
          pinCode: 756120,
        },
        {
          postOffice: "Rahanja B.O",
          pinCode: 756111,
        },
        {
          postOffice: "Raipur B.O",
          pinCode: 756129,
        },
        {
          postOffice: "Rajgharpokhari B.O",
          pinCode: 756131,
        },
        {
          postOffice: "Rajmukundapur B.O",
          pinCode: 756116,
        },
        {
          postOffice: "Ramachandrapur B.O",
          pinCode: 756114,
        },
        {
          postOffice: "Ramakrishnapur B.O",
          pinCode: 756113,
        },
        {
          postOffice: "Rambhila B.O",
          pinCode: 756111,
        },
        {
          postOffice: "Rameswarpur B.O",
          pinCode: 756117,
        },
        {
          postOffice: "Rampur B.O",
          pinCode: 756132,
        },
        {
          postOffice: "Randiahat S.O",
          pinCode: 756135,
        },
        {
          postOffice: "Ranital S.O (Bhadrak)",
          pinCode: 756111,
        },
        {
          postOffice: "Ratina B.O",
          pinCode: 756115,
        },
        {
          postOffice: "Sabrang S.O",
          pinCode: 756123,
        },
        {
          postOffice: "Sahada Sabrang B.O",
          pinCode: 756123,
        },
        {
          postOffice: "Sahapur B.O",
          pinCode: 756131,
        },
        {
          postOffice: "Sahaspur B.O",
          pinCode: 756119,
        },
        {
          postOffice: "Sahidnagar B.O",
          pinCode: 756116,
        },
        {
          postOffice: "Sahusahi B.O",
          pinCode: 756119,
        },
        {
          postOffice: "Sailendrapalli B.O",
          pinCode: 756132,
        },
        {
          postOffice: "Salandi Colony S.O",
          pinCode: 756100,
        },
        {
          postOffice: "Samian B.O",
          pinCode: 756123,
        },
        {
          postOffice: "Sanahavelisahi B.O",
          pinCode: 756164,
        },
        {
          postOffice: "Sanakrishnapur B.O",
          pinCode: 756125,
        },
        {
          postOffice: "Sanalpur B.O",
          pinCode: 756119,
        },
        {
          postOffice: "Sandado B.O",
          pinCode: 756115,
        },
        {
          postOffice: "Saragadia B.O",
          pinCode: 756101,
        },
        {
          postOffice: "Saramara B.O",
          pinCode: 756135,
        },
        {
          postOffice: "Sarasada B.O",
          pinCode: 756120,
        },
        {
          postOffice: "Saraswati B.O",
          pinCode: 756171,
        },
        {
          postOffice: "Sathibankuda B.O",
          pinCode: 756138,
        },
        {
          postOffice: "Saya B.O",
          pinCode: 756130,
        },
        {
          postOffice: "Sendtira B.O",
          pinCode: 756114,
        },
        {
          postOffice: "Serpur B.O",
          pinCode: 756127,
        },
        {
          postOffice: "Shyamsundarpur B.O",
          pinCode: 756119,
        },
        {
          postOffice: "Silandi B.O",
          pinCode: 756144,
        },
        {
          postOffice: "Sindol B.O",
          pinCode: 756130,
        },
        {
          postOffice: "Smantraipur B.O",
          pinCode: 756131,
        },
        {
          postOffice: "Sohara B.O",
          pinCode: 756117,
        },
        {
          postOffice: "Sriganga B.O",
          pinCode: 756116,
        },
        {
          postOffice: "Suan B.O",
          pinCode: 756162,
        },
        {
          postOffice: "Subudhia B.O",
          pinCode: 756129,
        },
        {
          postOffice: "Sukleswar B.O",
          pinCode: 756133,
        },
        {
          postOffice: "Sunderpur B.O",
          pinCode: 756119,
        },
        {
          postOffice: "Suryapur B.O",
          pinCode: 756119,
        },
        {
          postOffice: "Susua B.O",
          pinCode: 756116,
        },
        {
          postOffice: "Talagopabindha B.O",
          pinCode: 756116,
        },
        {
          postOffice: "Talapada B.O",
          pinCode: 756139,
        },
        {
          postOffice: "Tarago B.O",
          pinCode: 756114,
        },
        {
          postOffice: "Tentulidihi B.O",
          pinCode: 756133,
        },
        {
          postOffice: "Tesinga B.O",
          pinCode: 756121,
        },
        {
          postOffice: "Tiadisahi B.O",
          pinCode: 756131,
        },
        {
          postOffice: "Tihidi S.O",
          pinCode: 756130,
        },
        {
          postOffice: "Tihiri B.O",
          pinCode: 756181,
        },
        {
          postOffice: "Tillo Barasahi B.O",
          pinCode: 756114,
        },
        {
          postOffice: "Todanga B.O",
          pinCode: 756112,
        },
        {
          postOffice: "Totapada B.O",
          pinCode: 756129,
        },
        {
          postOffice: "Ugratara B.O",
          pinCode: 756133,
        },
        {
          postOffice: "Uttarbahini S.O",
          pinCode: 756181,
        },
      ],
      Balasore: [
        {
          postOffice: "Achutipur B.O",
          pinCode: 756047,
        },
        {
          postOffice: "Ada S.O",
          pinCode: 756134,
        },
        {
          postOffice: "Adangapantei B.O",
          pinCode: 756038,
        },
        {
          postOffice: "Aghirapada B.O",
          pinCode: 756049,
        },
        {
          postOffice: "Alalbindha B.O",
          pinCode: 756036,
        },
        {
          postOffice: "Alalpur B.O",
          pinCode: 756032,
        },
        {
          postOffice: "Alasuan B.O",
          pinCode: 756043,
        },
        {
          postOffice: "Anantapur S.O (Baleswar)",
          pinCode: 756046,
        },
        {
          postOffice: "Angula B.O",
          pinCode: 756045,
        },
        {
          postOffice: "Anko B.O",
          pinCode: 756028,
        },
        {
          postOffice: "Antara B.O",
          pinCode: 756134,
        },
        {
          postOffice: "Arabandha B.O",
          pinCode: 756058,
        },
        {
          postOffice: "Arakhpur B.O",
          pinCode: 756182,
        },
        {
          postOffice: "Arjunpur B.O",
          pinCode: 756048,
        },
        {
          postOffice: "Armala B.O",
          pinCode: 756019,
        },
        {
          postOffice: "Aruhabad B.O",
          pinCode: 756044,
        },
        {
          postOffice: "Aruhabruti B.O",
          pinCode: 756079,
        },
        {
          postOffice: "Ashabandha B.O",
          pinCode: 756033,
        },
        {
          postOffice: "Asti B.O",
          pinCode: 756026,
        },
        {
          postOffice: "Asuria B.O",
          pinCode: 756047,
        },
        {
          postOffice: "Attapur B.O",
          pinCode: 756045,
        },
        {
          postOffice: "Ausha B.O",
          pinCode: 756037,
        },
        {
          postOffice: "Avana S.O",
          pinCode: 756051,
        },
        {
          postOffice: "Azimabad S.O",
          pinCode: 756001,
        },
        {
          postOffice: "Badakuruda B.O",
          pinCode: 756024,
        },
        {
          postOffice: "Badapal B.O",
          pinCode: 756019,
        },
        {
          postOffice: "Badapokhari B.O",
          pinCode: 756047,
        },
        {
          postOffice: "Badas B.O",
          pinCode: 756083,
        },
        {
          postOffice: "Badasimulia B.O",
          pinCode: 756026,
        },
        {
          postOffice: "Badasindhia B.O",
          pinCode: 756003,
        },
        {
          postOffice: "Badhan B.O",
          pinCode: 756080,
        },
        {
          postOffice: "Badhapal B.O",
          pinCode: 756026,
        },
        {
          postOffice: "Bagada B.O",
          pinCode: 756083,
        },
        {
          postOffice: "Baghua B.O",
          pinCode: 756182,
        },
        {
          postOffice: "Bahabalpur B.O",
          pinCode: 756027,
        },
        {
          postOffice: "Bahala B.O",
          pinCode: 756060,
        },
        {
          postOffice: "Bahanaga S.O",
          pinCode: 756042,
        },
        {
          postOffice: "Baharda B.O",
          pinCode: 756035,
        },
        {
          postOffice: "Baharda Bazar B.O",
          pinCode: 756029,
        },
        {
          postOffice: "Baiganabadia B.O",
          pinCode: 756079,
        },
        {
          postOffice: "Bainanda Mangarajpur B.O",
          pinCode: 756045,
        },
        {
          postOffice: "Baitpur B.O",
          pinCode: 756036,
        },
        {
          postOffice: "Bajitpur B.O",
          pinCode: 756085,
        },
        {
          postOffice: "Balanga B.O",
          pinCode: 756046,
        },
        {
          postOffice: "Balaramgadi B.O",
          pinCode: 756025,
        },
        {
          postOffice: "Balarampur B.O",
          pinCode: 756024,
        },
        {
          postOffice: "Balasore Court S.O",
          pinCode: 756001,
        },
        {
          postOffice: "Balasore H.O",
          pinCode: 756001,
        },
        {
          postOffice: "Balasore RS S.O",
          pinCode: 756001,
        },
        {
          postOffice: "Balia Farm B.O",
          pinCode: 756056,
        },
        {
          postOffice: "Baliapal Katisahi B.O",
          pinCode: 756023,
        },
        {
          postOffice: "Baliapal Narayanpur B.O",
          pinCode: 756083,
        },
        {
          postOffice: "Baliapal S.O",
          pinCode: 756026,
        },
        {
          postOffice: "Baliapati B.O",
          pinCode: 756081,
        },
        {
          postOffice: "Balikhanda S.O",
          pinCode: 756166,
        },
        {
          postOffice: "Balim B.O",
          pinCode: 756035,
        },
        {
          postOffice: "Bamada B.O",
          pinCode: 756028,
        },
        {
          postOffice: "Bana Bishnupur B.O",
          pinCode: 756047,
        },
        {
          postOffice: "Bankeswar B.O",
          pinCode: 756021,
        },
        {
          postOffice: "Barabati S.O",
          pinCode: 756003,
        },
        {
          postOffice: "Barada B.O",
          pinCode: 756134,
        },
        {
          postOffice: "Barada B.O",
          pinCode: 756022,
        },
        {
          postOffice: "Baradiha B.O",
          pinCode: 756033,
        },
        {
          postOffice: "Barahapur B.O",
          pinCode: 756046,
        },
        {
          postOffice: "Barbatia B.O",
          pinCode: 756079,
        },
        {
          postOffice: "Barbatia Bazar B.O",
          pinCode: 756039,
        },
        {
          postOffice: "Bardhanpur B.O",
          pinCode: 756021,
        },
        {
          postOffice: "Bari B.O",
          pinCode: 756126,
        },
        {
          postOffice: "Bariha B.O",
          pinCode: 756126,
        },
        {
          postOffice: "Bartana B.O",
          pinCode: 756038,
        },
        {
          postOffice: "Bartana B.O",
          pinCode: 756032,
        },
        {
          postOffice: "Barun Singh B.O",
          pinCode: 756060,
        },
        {
          postOffice: "Barunagadia B.O",
          pinCode: 756029,
        },
        {
          postOffice: "Basta S.O",
          pinCode: 756029,
        },
        {
          postOffice: "Batagramghat B.O",
          pinCode: 756036,
        },
        {
          postOffice: "Bati B.O",
          pinCode: 756126,
        },
        {
          postOffice: "Baunsadiha B.O",
          pinCode: 756035,
        },
        {
          postOffice: "Begunia B.O",
          pinCode: 756020,
        },
        {
          postOffice: "Beladandia B.O",
          pinCode: 756023,
        },
        {
          postOffice: "Belda B.O",
          pinCode: 756035,
        },
        {
          postOffice: "Belli B.O",
          pinCode: 756023,
        },
        {
          postOffice: "Betagadia B.O",
          pinCode: 756083,
        },
        {
          postOffice: "Bhandarikuli B.O",
          pinCode: 756033,
        },
        {
          postOffice: "Bhimpur B.O",
          pinCode: 756021,
        },
        {
          postOffice: "Bhograi S.O",
          pinCode: 756038,
        },
        {
          postOffice: "Bhounriabad B.O",
          pinCode: 756020,
        },
        {
          postOffice: "Bichitrapur B.O",
          pinCode: 756037,
        },
        {
          postOffice: "Bidubazar B.O",
          pinCode: 756042,
        },
        {
          postOffice: "Bidyadharpur B.O",
          pinCode: 756029,
        },
        {
          postOffice: "Bishnupur B.O",
          pinCode: 756051,
        },
        {
          postOffice: "Bishnupur B.O",
          pinCode: 756026,
        },
        {
          postOffice: "Boita B.O",
          pinCode: 756043,
        },
        {
          postOffice: "Bolang B.O",
          pinCode: 756024,
        },
        {
          postOffice: "Buanl B.O",
          pinCode: 756027,
        },
        {
          postOffice: "Budhakusumi B.O",
          pinCode: 756034,
        },
        {
          postOffice: "Chakabarahapur S.O",
          pinCode: 756055,
        },
        {
          postOffice: "Chakaisab B.O",
          pinCode: 756035,
        },
        {
          postOffice: "Chakajagannathpur S.O",
          pinCode: 756053,
        },
        {
          postOffice: "Chakrada B.O",
          pinCode: 756022,
        },
        {
          postOffice: "Chaksartha B.O",
          pinCode: 756027,
        },
        {
          postOffice: "Chalanti B.O",
          pinCode: 756032,
        },
        {
          postOffice: "Chamara Gaon B.O",
          pinCode: 756032,
        },
        {
          postOffice: "Chandakusumi B.O",
          pinCode: 756035,
        },
        {
          postOffice: "Chandamani B.O",
          pinCode: 756083,
        },
        {
          postOffice: "Chandaneswar S.O",
          pinCode: 756085,
        },
        {
          postOffice: "Chandarpada B.O",
          pinCode: 756134,
        },
        {
          postOffice: "Chandipur S.O",
          pinCode: 756025,
        },
        {
          postOffice: "Chasakhand B.O",
          pinCode: 756003,
        },
        {
          postOffice: "Chasipada B.O",
          pinCode: 756030,
        },
        {
          postOffice: "Chaumukh B.O",
          pinCode: 756083,
        },
        {
          postOffice: "Chhamouza B.O",
          pinCode: 756032,
        },
        {
          postOffice: "Chhanapur B.O",
          pinCode: 756056,
        },
        {
          postOffice: "Chhanua B.O",
          pinCode: 756027,
        },
        {
          postOffice: "Chhatrapur B.O",
          pinCode: 756058,
        },
        {
          postOffice: "Chinchlagadia B.O",
          pinCode: 756030,
        },
        {
          postOffice: "Chormara B.O",
          pinCode: 756032,
        },
        {
          postOffice: "Chudamanipur B.O",
          pinCode: 756033,
        },
        {
          postOffice: "Dagarpada B.O",
          pinCode: 756047,
        },
        {
          postOffice: "Dagra B.O",
          pinCode: 756083,
        },
        {
          postOffice: "Dahamunda S.O",
          pinCode: 756079,
        },
        {
          postOffice: "Dahapada B.O",
          pinCode: 756003,
        },
        {
          postOffice: "Dahisada B.O",
          pinCode: 756045,
        },
        {
          postOffice: "Dahunda B.O",
          pinCode: 756035,
        },
        {
          postOffice: "Dakhinanadbani B.O",
          pinCode: 756035,
        },
        {
          postOffice: "Dalanga B.O",
          pinCode: 756047,
        },
        {
          postOffice: "Dalua B.O",
          pinCode: 756026,
        },
        {
          postOffice: "Damodarpur B.O",
          pinCode: 756182,
        },
        {
          postOffice: "Dandika B.O",
          pinCode: 756029,
        },
        {
          postOffice: "Dangapita B.O",
          pinCode: 756083,
        },
        {
          postOffice: "Darada S.O",
          pinCode: 756022,
        },
        {
          postOffice: "Darkholi B.O",
          pinCode: 756049,
        },
        {
          postOffice: "Debhog B.O",
          pinCode: 756023,
        },
        {
          postOffice: "Dehurda S.O",
          pinCode: 756036,
        },
        {
          postOffice: "Demuria B.O",
          pinCode: 756034,
        },
        {
          postOffice: "Deulahat B.O",
          pinCode: 756036,
        },
        {
          postOffice: "Dhansimulia S.O",
          pinCode: 756084,
        },
        {
          postOffice: "Dharaganj B.O",
          pinCode: 756020,
        },
        {
          postOffice: "Dhitpura B.O",
          pinCode: 756030,
        },
        {
          postOffice: "Dhobachakurai B.O",
          pinCode: 756029,
        },
        {
          postOffice: "Dhobasila B.O",
          pinCode: 756040,
        },
        {
          postOffice: "Digdha B.O",
          pinCode: 756027,
        },
        {
          postOffice: "Dublagadi B.O",
          pinCode: 756027,
        },
        {
          postOffice: "Dubsahi B.O",
          pinCode: 756035,
        },
        {
          postOffice: "Dundukut B.O",
          pinCode: 756081,
        },
        {
          postOffice: "Dungura S.O",
          pinCode: 756182,
        },
        {
          postOffice: "Durgadevi B.O",
          pinCode: 756020,
        },
        {
          postOffice: "Durpal B.O",
          pinCode: 756035,
        },
        {
          postOffice: "Dwarika B.O",
          pinCode: 756044,
        },
        {
          postOffice: "Fakirmohan College S.O",
          pinCode: 756001,
        },
        {
          postOffice: "Fatehpur B.O",
          pinCode: 756048,
        },
        {
          postOffice: "Fulbani S.O",
          pinCode: 756037,
        },
        {
          postOffice: "Fulwar-kaswa B.O",
          pinCode: 756003,
        },
        {
          postOffice: "Gadasahi Baliapal B.O",
          pinCode: 756023,
        },
        {
          postOffice: "Gandasthapur B.O",
          pinCode: 756042,
        },
        {
          postOffice: "Gandibed B.O",
          pinCode: 756047,
        },
        {
          postOffice: "Garadihi B.O",
          pinCode: 756041,
        },
        {
          postOffice: "Garasang B.O",
          pinCode: 756134,
        },
        {
          postOffice: "Genguti B.O",
          pinCode: 756056,
        },
        {
          postOffice: "Ghantiary B.O",
          pinCode: 756026,
        },
        {
          postOffice: "Ghantua B.O",
          pinCode: 756023,
        },
        {
          postOffice: "Ghasua B.O",
          pinCode: 756055,
        },
        {
          postOffice: "Ghodapada B.O",
          pinCode: 756003,
        },
        {
          postOffice: "Gilajodi B.O",
          pinCode: 756081,
        },
        {
          postOffice: "Gobindpur B.O",
          pinCode: 756019,
        },
        {
          postOffice: "Gop B.O",
          pinCode: 756032,
        },
        {
          postOffice: "Gopalpur B.O",
          pinCode: 756041,
        },
        {
          postOffice: "Gopalpur S.O (Balasore)",
          pinCode: 756044,
        },
        {
          postOffice: "Gopinathpur B.O",
          pinCode: 756030,
        },
        {
          postOffice: "Gopinathpur B.O",
          pinCode: 756036,
        },
        {
          postOffice: "Govindapur B.O",
          pinCode: 756126,
        },
        {
          postOffice: "Guapal B.O",
          pinCode: 756059,
        },
        {
          postOffice: "Gud B.O",
          pinCode: 756046,
        },
        {
          postOffice: "Gudikhal B.O",
          pinCode: 756030,
        },
        {
          postOffice: "Gududapatna B.O",
          pinCode: 756019,
        },
        {
          postOffice: "Gudupai B.O",
          pinCode: 756025,
        },
        {
          postOffice: "Guneibasan B.O",
          pinCode: 756036,
        },
        {
          postOffice: "Haladiapada B.O",
          pinCode: 756029,
        },
        {
          postOffice: "Haldipada S.O",
          pinCode: 756027,
        },
        {
          postOffice: "Haridaspur B.O",
          pinCode: 756036,
        },
        {
          postOffice: "Haripur B.O",
          pinCode: 756003,
        },
        {
          postOffice: "Haripur B.O",
          pinCode: 756115,
        },
        {
          postOffice: "Hatiadiha B.O",
          pinCode: 756028,
        },
        {
          postOffice: "Hatigarh S.O (Baleswar)",
          pinCode: 756033,
        },
        {
          postOffice: "Hatikhulia B.O",
          pinCode: 756045,
        },
        {
          postOffice: "Hatsahi B.O",
          pinCode: 756040,
        },
        {
          postOffice: "Hidigaon B.O",
          pinCode: 756025,
        },
        {
          postOffice: "Ikida B.O",
          pinCode: 756034,
        },
        {
          postOffice: "Inchudi B.O",
          pinCode: 756021,
        },
        {
          postOffice: "Irda S.O",
          pinCode: 756080,
        },
        {
          postOffice: "Issannagar S.O",
          pinCode: 756001,
        },
        {
          postOffice: "Iswarpur B.O",
          pinCode: 756042,
        },
        {
          postOffice: "Iswarpur B.O",
          pinCode: 756038,
        },
        {
          postOffice: "Jadibali B.O",
          pinCode: 756041,
        },
        {
          postOffice: "Jagai B.O",
          pinCode: 756083,
        },
        {
          postOffice: "Jagannathpur B.O",
          pinCode: 756044,
        },
        {
          postOffice: "Jagannathpur Bachhada B.O",
          pinCode: 756046,
        },
        {
          postOffice: "Jageswarpada B.O",
          pinCode: 756044,
        },
        {
          postOffice: "Jalanga Gandibed B.O",
          pinCode: 756134,
        },
        {
          postOffice: "Jaleswar H.O",
          pinCode: 756032,
        },
        {
          postOffice: "Jaleswar Railway Station S.O",
          pinCode: 756086,
        },
        {
          postOffice: "Jaleswarpur B.O",
          pinCode: 756036,
        },
        {
          postOffice: "Jamalpur B.O",
          pinCode: 756029,
        },
        {
          postOffice: "Jamalpur B.O",
          pinCode: 756032,
        },
        {
          postOffice: "Jamatkula B.O",
          pinCode: 756083,
        },
        {
          postOffice: "Jambhirai B.O",
          pinCode: 756024,
        },
        {
          postOffice: "Jamjhadi B.O",
          pinCode: 756126,
        },
        {
          postOffice: "Jamkunda B.O",
          pinCode: 756026,
        },
        {
          postOffice: "Jamsuli S.O",
          pinCode: 756081,
        },
        {
          postOffice: "Jamudiha B.O",
          pinCode: 756041,
        },
        {
          postOffice: "Jamuna B.O",
          pinCode: 756058,
        },
        {
          postOffice: "Janhia B.O",
          pinCode: 756045,
        },
        {
          postOffice: "Januganj B.O",
          pinCode: 756019,
        },
        {
          postOffice: "Jathia B.O",
          pinCode: 756023,
        },
        {
          postOffice: "Jayarampur B.O",
          pinCode: 756038,
        },
        {
          postOffice: "Jaydev Kasba B.O",
          pinCode: 756021,
        },
        {
          postOffice: "Jharapimpal B.O",
          pinCode: 756026,
        },
        {
          postOffice: "Jhinkiria B.O",
          pinCode: 756027,
        },
        {
          postOffice: "Jirtal B.O",
          pinCode: 756043,
        },
        {
          postOffice: "Kabataghati B.O",
          pinCode: 756033,
        },
        {
          postOffice: "Kachuadi B.O",
          pinCode: 756035,
        },
        {
          postOffice: "Kahalia B.O",
          pinCode: 756040,
        },
        {
          postOffice: "Kainagari B.O",
          pinCode: 756080,
        },
        {
          postOffice: "Kaithagadia B.O",
          pinCode: 756059,
        },
        {
          postOffice: "Kakhra S.O",
          pinCode: 756039,
        },
        {
          postOffice: "Kalakad B.O",
          pinCode: 756041,
        },
        {
          postOffice: "Kalama B.O",
          pinCode: 756033,
        },
        {
          postOffice: "Kalaspur B.O",
          pinCode: 756166,
        },
        {
          postOffice: "Kalyani B.O",
          pinCode: 756044,
        },
        {
          postOffice: "Kamarda S.O",
          pinCode: 756035,
        },
        {
          postOffice: "Kamarsalia B.O",
          pinCode: 756034,
        },
        {
          postOffice: "Kanchpada B.O",
          pinCode: 756166,
        },
        {
          postOffice: "Kandagaridi B.O",
          pinCode: 756042,
        },
        {
          postOffice: "Kankei B.O",
          pinCode: 756033,
        },
        {
          postOffice: "Kanrali B.O",
          pinCode: 756019,
        },
        {
          postOffice: "Kans B.O",
          pinCode: 756020,
        },
        {
          postOffice: "Karanja B.O",
          pinCode: 756083,
        },
        {
          postOffice: "Karanjabindha B.O",
          pinCode: 756044,
        },
        {
          postOffice: "Karihanda B.O",
          pinCode: 756035,
        },
        {
          postOffice: "Kasba Jaipur B.O",
          pinCode: 756043,
        },
        {
          postOffice: "Kashafal B.O",
          pinCode: 756024,
        },
        {
          postOffice: "Kashimpur B.O",
          pinCode: 756019,
        },
        {
          postOffice: "Kasida B.O",
          pinCode: 756034,
        },
        {
          postOffice: "Kedarpur B.O",
          pinCode: 756045,
        },
        {
          postOffice: "Kesharipur B.O",
          pinCode: 756045,
        },
        {
          postOffice: "Keshpura B.O",
          pinCode: 756032,
        },
        {
          postOffice: "Khadikapada B.O",
          pinCode: 756029,
        },
        {
          postOffice: "Khaira S.O (Baleswar)",
          pinCode: 756048,
        },
        {
          postOffice: "Khairagobindapur B.O",
          pinCode: 756049,
        },
        {
          postOffice: "Khairda B.O",
          pinCode: 756035,
        },
        {
          postOffice: "Khalabadia B.O",
          pinCode: 756038,
        },
        {
          postOffice: "Khalamuhani B.O",
          pinCode: 756023,
        },
        {
          postOffice: "Khalina B.O",
          pinCode: 756034,
        },
        {
          postOffice: "Khan Nagar B.O",
          pinCode: 756060,
        },
        {
          postOffice: "Khanabad B.O",
          pinCode: 756033,
        },
        {
          postOffice: "Khantapada S.O",
          pinCode: 756043,
        },
        {
          postOffice: "Kharadiha B.O",
          pinCode: 756041,
        },
        {
          postOffice: "Kharsahapur B.O",
          pinCode: 756046,
        },
        {
          postOffice: "Khirachora Gopinath S.O",
          pinCode: 756018,
        },
        {
          postOffice: "Khuard B.O",
          pinCode: 756033,
        },
        {
          postOffice: "Khuluda B.O",
          pinCode: 756034,
        },
        {
          postOffice: "Kishorchandrapur B.O",
          pinCode: 756058,
        },
        {
          postOffice: "Kochiakoili B.O",
          pinCode: 756042,
        },
        {
          postOffice: "Kothapada B.O",
          pinCode: 756022,
        },
        {
          postOffice: "Kothia B.O",
          pinCode: 756022,
        },
        {
          postOffice: "Kotisahi B.O",
          pinCode: 756035,
        },
        {
          postOffice: "Kuanrpur B.O",
          pinCode: 756021,
        },
        {
          postOffice: "Kudei Nadigaon B.O",
          pinCode: 756045,
        },
        {
          postOffice: "Kuldiha B.O",
          pinCode: 756030,
        },
        {
          postOffice: "Kuligaon B.O",
          pinCode: 756043,
        },
        {
          postOffice: "Kumarjalina B.O",
          pinCode: 756036,
        },
        {
          postOffice: "Kumarmuli B.O",
          pinCode: 756036,
        },
        {
          postOffice: "Kumarpur B.O",
          pinCode: 756046,
        },
        {
          postOffice: "Kumbhari B.O",
          pinCode: 756023,
        },
        {
          postOffice: "Kupari S.O",
          pinCode: 756059,
        },
        {
          postOffice: "Kuruda S.O",
          pinCode: 756056,
        },
        {
          postOffice: "Kuruda-soro B.O",
          pinCode: 756046,
        },
        {
          postOffice: "Kurunta B.O",
          pinCode: 756047,
        },
        {
          postOffice: "Kushadiha (A) B.O",
          pinCode: 756029,
        },
        {
          postOffice: "Kushadiha (B)church B.O",
          pinCode: 756029,
        },
        {
          postOffice: "Kusuda B.O",
          pinCode: 756035,
        },
        {
          postOffice: "Lachman Khunta B.O",
          pinCode: 756028,
        },
        {
          postOffice: "Lakhananath B.O",
          pinCode: 756032,
        },
        {
          postOffice: "Lakhananath Road B.O",
          pinCode: 756032,
        },
        {
          postOffice: "Machhada B.O",
          pinCode: 756080,
        },
        {
          postOffice: "Machhadiha B.O",
          pinCode: 756029,
        },
        {
          postOffice: "Machharanka Simulia B.O",
          pinCode: 756023,
        },
        {
          postOffice: "Machhua B.O",
          pinCode: 756020,
        },
        {
          postOffice: "Madhupura B.O",
          pinCode: 756035,
        },
        {
          postOffice: "Mahagab B.O",
          pinCode: 756035,
        },
        {
          postOffice: "Maharudrapur B.O",
          pinCode: 756044,
        },
        {
          postOffice: "Mahatipur B.O",
          pinCode: 756048,
        },
        {
          postOffice: "Mahispata B.O",
          pinCode: 756020,
        },
        {
          postOffice: "Mahu Muhana B.O",
          pinCode: 756045,
        },
        {
          postOffice: "Mahuduma B.O",
          pinCode: 756033,
        },
        {
          postOffice: "Makalpur S.O",
          pinCode: 756003,
        },
        {
          postOffice: "Makhanpur B.O",
          pinCode: 756047,
        },
        {
          postOffice: "Malaruan B.O",
          pinCode: 756038,
        },
        {
          postOffice: "Malipal B.O",
          pinCode: 756032,
        },
        {
          postOffice: "Mandhatabazar B.O",
          pinCode: 756024,
        },
        {
          postOffice: "Mandrukula B.O",
          pinCode: 756029,
        },
        {
          postOffice: "Mangalapur B.O",
          pinCode: 756045,
        },
        {
          postOffice: "Manikula B.O",
          pinCode: 756002,
        },
        {
          postOffice: "Manipur B.O",
          pinCode: 756047,
        },
        {
          postOffice: "Mankidia B.O",
          pinCode: 756033,
        },
        {
          postOffice: "Mankunda B.O",
          pinCode: 756036,
        },
        {
          postOffice: "Markona B.O",
          pinCode: 756126,
        },
        {
          postOffice: "Masanbaria B.O",
          pinCode: 756034,
        },
        {
          postOffice: "Mathani B.O",
          pinCode: 756029,
        },
        {
          postOffice: "Mathuranath B.O",
          pinCode: 756032,
        },
        {
          postOffice: "Matiali B.O",
          pinCode: 756041,
        },
        {
          postOffice: "Mirigini B.O",
          pinCode: 756040,
        },
        {
          postOffice: "Mirjapur B.O",
          pinCode: 756134,
        },
        {
          postOffice: "Mitrapur S.O",
          pinCode: 756020,
        },
        {
          postOffice: "Mituani B.O",
          pinCode: 756048,
        },
        {
          postOffice: "Mobarakpur S.O",
          pinCode: 756045,
        },
        {
          postOffice: "Mohammad Nagar B.O",
          pinCode: 756030,
        },
        {
          postOffice: "Mohammad Nagarpatna B.O",
          pinCode: 756032,
        },
        {
          postOffice: "Mohammadpur B.O",
          pinCode: 756126,
        },
        {
          postOffice: "Motiganj S.O (Baleswar)",
          pinCode: 756003,
        },
        {
          postOffice: "Mukulisi B.O",
          pinCode: 756022,
        },
        {
          postOffice: "Mulisingh B.O",
          pinCode: 756045,
        },
        {
          postOffice: "Munutunia B.O",
          pinCode: 756033,
        },
        {
          postOffice: "Nabra B.O",
          pinCode: 756081,
        },
        {
          postOffice: "Nachhipur B.O",
          pinCode: 756048,
        },
        {
          postOffice: "Nachinda B.O",
          pinCode: 756035,
        },
        {
          postOffice: "Nachinta B.O",
          pinCode: 756043,
        },
        {
          postOffice: "Nadbani B.O",
          pinCode: 756024,
        },
        {
          postOffice: "Nafrai B.O",
          pinCode: 756037,
        },
        {
          postOffice: "Nagram B.O",
          pinCode: 756027,
        },
        {
          postOffice: "Nahanga B.O",
          pinCode: 756059,
        },
        {
          postOffice: "Naikudi B.O",
          pinCode: 756081,
        },
        {
          postOffice: "Nalabahar B.O",
          pinCode: 756028,
        },
        {
          postOffice: "Nampo S.O",
          pinCode: 756034,
        },
        {
          postOffice: "Nangaleswar S.O",
          pinCode: 756024,
        },
        {
          postOffice: "Naraharipur B.O",
          pinCode: 756019,
        },
        {
          postOffice: "Naranmohantypadia B.O",
          pinCode: 756037,
        },
        {
          postOffice: "Narasingpur B.O",
          pinCode: 756020,
        },
        {
          postOffice: "Narayanapur B.O",
          pinCode: 756041,
        },
        {
          postOffice: "Narayanpur B.O",
          pinCode: 756036,
        },
        {
          postOffice: "Naskarpur B.O",
          pinCode: 756085,
        },
        {
          postOffice: "Nayabazar Balasore S.O",
          pinCode: 756001,
        },
        {
          postOffice: "Nayabazar Jaleswar S.O",
          pinCode: 756032,
        },
        {
          postOffice: "Nayapalli B.O",
          pinCode: 756079,
        },
        {
          postOffice: "Nepura B.O",
          pinCode: 756023,
        },
        {
          postOffice: "Netua B.O",
          pinCode: 756084,
        },
        {
          postOffice: "Nijampur B.O",
          pinCode: 756003,
        },
        {
          postOffice: "Nikhira B.O",
          pinCode: 756023,
        },
        {
          postOffice: "Nilgiri College S.O",
          pinCode: 756040,
        },
        {
          postOffice: "Nilpura B.O",
          pinCode: 756079,
        },
        {
          postOffice: "Nimatpur B.O",
          pinCode: 756036,
        },
        {
          postOffice: "Nimpada B.O",
          pinCode: 756080,
        },
        {
          postOffice: "Nimpal B.O",
          pinCode: 756020,
        },
        {
          postOffice: "Nishanpur B.O",
          pinCode: 756036,
        },
        {
          postOffice: "Nuagaon B.O",
          pinCode: 756028,
        },
        {
          postOffice: "Nuagaon B.O",
          pinCode: 756024,
        },
        {
          postOffice: "Nuapadhi B.O",
          pinCode: 756020,
        },
        {
          postOffice: "Odangi B.O",
          pinCode: 756027,
        },
        {
          postOffice: "Olipur B.O",
          pinCode: 756027,
        },
        {
          postOffice: "Olmara B.O",
          pinCode: 756033,
        },
        {
          postOffice: "Oupada S.O",
          pinCode: 756049,
        },
        {
          postOffice: "Padagaon B.O",
          pinCode: 756043,
        },
        {
          postOffice: "Padhuan B.O",
          pinCode: 756046,
        },
        {
          postOffice: "Paiksida B.O",
          pinCode: 756032,
        },
        {
          postOffice: "Pakhar B.O",
          pinCode: 756046,
        },
        {
          postOffice: "Panasha B.O",
          pinCode: 756080,
        },
        {
          postOffice: "Panchpada B.O",
          pinCode: 756133,
        },
        {
          postOffice: "Panchupada B.O",
          pinCode: 756027,
        },
        {
          postOffice: "Panchupalli B.O",
          pinCode: 756024,
        },
        {
          postOffice: "Panchurukhi B.O",
          pinCode: 756026,
        },
        {
          postOffice: "Pandasuni B.O",
          pinCode: 756044,
        },
        {
          postOffice: "Pandurangi B.O",
          pinCode: 756029,
        },
        {
          postOffice: "Pani Chhatra B.O",
          pinCode: 756059,
        },
        {
          postOffice: "Panjibag B.O",
          pinCode: 756002,
        },
        {
          postOffice: "Panpana B.O",
          pinCode: 756043,
        },
        {
          postOffice: "Parbatipur B.O",
          pinCode: 756166,
        },
        {
          postOffice: "Parkhi B.O",
          pinCode: 756025,
        },
        {
          postOffice: "Pasarbindha B.O",
          pinCode: 756036,
        },
        {
          postOffice: "Paschima Bad B.O",
          pinCode: 756026,
        },
        {
          postOffice: "Patna B.O",
          pinCode: 756020,
        },
        {
          postOffice: "Paunsakuli B.O",
          pinCode: 756081,
        },
        {
          postOffice: "Pithahat B.O",
          pinCode: 756058,
        },
        {
          postOffice: "Pithapur B.O",
          pinCode: 756038,
        },
        {
          postOffice: "Podasul B.O",
          pinCode: 756040,
        },
        {
          postOffice: "Pratapada B.O",
          pinCode: 756043,
        },
        {
          postOffice: "Pratappur S.O (Baleswar)",
          pinCode: 756083,
        },
        {
          postOffice: "Pundala B.O",
          pinCode: 756020,
        },
        {
          postOffice: "Puruna Balasore B.O",
          pinCode: 756002,
        },
        {
          postOffice: "Purusottampur B.O",
          pinCode: 756035,
        },
        {
          postOffice: "Putina B.O",
          pinCode: 756035,
        },
        {
          postOffice: "Putura B.O",
          pinCode: 756081,
        },
        {
          postOffice: "Radhaballavpur B.O",
          pinCode: 756045,
        },
        {
          postOffice: "Rahaniaganj B.O",
          pinCode: 756044,
        },
        {
          postOffice: "Raibania B.O",
          pinCode: 756033,
        },
        {
          postOffice: "Rairamchandrapur B.O",
          pinCode: 756032,
        },
        {
          postOffice: "Rairamchandrapur B.O",
          pinCode: 756048,
        },
        {
          postOffice: "Raj Berhampur S.O",
          pinCode: 756058,
        },
        {
          postOffice: "Raj Nilgiri S.O",
          pinCode: 756040,
        },
        {
          postOffice: "Rajpur B.O",
          pinCode: 756032,
        },
        {
          postOffice: "Ramakrishnapur B.O",
          pinCode: 756166,
        },
        {
          postOffice: "Ranasahi B.O",
          pinCode: 756002,
        },
        {
          postOffice: "Rasalpur B.O",
          pinCode: 756079,
        },
        {
          postOffice: "Rasalpur B.O",
          pinCode: 756038,
        },
        {
          postOffice: "Rasalpur S.O",
          pinCode: 756021,
        },
        {
          postOffice: "Rasaslpur B.O",
          pinCode: 756020,
        },
        {
          postOffice: "Rella B.O",
          pinCode: 756026,
        },
        {
          postOffice: "Remu B.O",
          pinCode: 756081,
        },
        {
          postOffice: "Remuna S.O",
          pinCode: 756019,
        },
        {
          postOffice: "Reserve Police Line S.O",
          pinCode: 756001,
        },
        {
          postOffice: "Routpada B.O",
          pinCode: 756028,
        },
        {
          postOffice: "Rudhunga B.O",
          pinCode: 756126,
        },
        {
          postOffice: "Rupkhand B.O",
          pinCode: 756051,
        },
        {
          postOffice: "Rupsa S.O",
          pinCode: 756028,
        },
        {
          postOffice: "Sabira R.S. B.O",
          pinCode: 756045,
        },
        {
          postOffice: "Sadanandapur B.O",
          pinCode: 756029,
        },
        {
          postOffice: "Sahada B.O",
          pinCode: 756080,
        },
        {
          postOffice: "Sahada B.O",
          pinCode: 756002,
        },
        {
          postOffice: "Sahadevkhunta S.O",
          pinCode: 756001,
        },
        {
          postOffice: "Sahaspura B.O",
          pinCode: 756046,
        },
        {
          postOffice: "Sahid Park S.O",
          pinCode: 756003,
        },
        {
          postOffice: "Sahigaon B.O",
          pinCode: 756126,
        },
        {
          postOffice: "Sahupada B.O",
          pinCode: 756003,
        },
        {
          postOffice: "Sajanagarh S.O",
          pinCode: 756041,
        },
        {
          postOffice: "Sajanpur B.O",
          pinCode: 756045,
        },
        {
          postOffice: "Salikotha B.O",
          pinCode: 756032,
        },
        {
          postOffice: "Sampei B.O",
          pinCode: 756047,
        },
        {
          postOffice: "Sankhapodadiha B.O",
          pinCode: 756046,
        },
        {
          postOffice: "Sankhari B.O",
          pinCode: 756037,
        },
        {
          postOffice: "Santhapada B.O",
          pinCode: 756055,
        },
        {
          postOffice: "Santragadia B.O",
          pinCode: 756042,
        },
        {
          postOffice: "Sardhapur B.O",
          pinCode: 756037,
        },
        {
          postOffice: "Sargaon B.O",
          pinCode: 756027,
        },
        {
          postOffice: "Sargaon B.",
          pinCode: 756002,
        },
        {
          postOffice: "Sarkana BO",
          pinCode: 756048,
        },
        {
          postOffice: "Sarsankha B.O",
          pinCode: 756045,
        },
        {
          postOffice: "Sarsatia B.O",
          pinCode: 756043,
        },
        {
          postOffice: "Sartha B.O",
          pinCode: 756027,
        },
        {
          postOffice: "Sarugaon B.O",
          pinCode: 756049,
        },
        {
          postOffice: "Sathilabalbalia B.O",
          pinCode: 756020,
        },
        {
          postOffice: "Saud B.O",
          pinCode: 756042,
        },
        {
          postOffice: "Saudi B.O",
          pinCode: 756024,
        },
        {
          postOffice: "Saundia B.O",
          pinCode: 756047,
        },
        {
          postOffice: "Sergarh S.O",
          pinCode: 756060,
        },
        {
          postOffice: "Shyamsundarpur B.O",
          pinCode: 756040,
        },
        {
          postOffice: "Siadimal B.O",
          pinCode: 756040,
        },
        {
          postOffice: "Sikharpur B.O",
          pinCode: 756032,
        },
        {
          postOffice: "Simulia B.O",
          pinCode: 756045,
        },
        {
          postOffice: "Simulia Bazar S.O",
          pinCode: 756126,
        },
        {
          postOffice: "Simulia S.O",
          pinCode: 756126,
        },
        {
          postOffice: "Sindhia B.O",
          pinCode: 756003,
        },
        {
          postOffice: "Singa Khunta B.O",
          pinCode: 756045,
        },
        {
          postOffice: "Singiri B.O",
          pinCode: 756020,
        },
        {
          postOffice: "Singla S.O",
          pinCode: 756023,
        },
        {
          postOffice: "Sirapur B.O",
          pinCode: 756055,
        },
        {
          postOffice: "Soharia B.O",
          pinCode: 756036,
        },
        {
          postOffice: "Solpata B.O",
          pinCode: 756027,
        },
        {
          postOffice: "Somnathpur B.O",
          pinCode: 756019,
        },
        {
          postOffice: "Soro Bazar S.O",
          pinCode: 756045,
        },
        {
          postOffice: "Soro College S.O",
          pinCode: 756045,
        },
        {
          postOffice: "Soro S.O",
          pinCode: 756045,
        },
        {
          postOffice: "Sovarampur S.O",
          pinCode: 756001,
        },
        {
          postOffice: "Srijang B.O",
          pinCode: 756044,
        },
        {
          postOffice: "Srikanthapur S.O",
          pinCode: 756001,
        },
        {
          postOffice: "Srikona B.O",
          pinCode: 756025,
        },
        {
          postOffice: "Srimantapur B.O",
          pinCode: 756166,
        },
        {
          postOffice: "Srirampur B.O",
          pinCode: 756029,
        },
        {
          postOffice: "Srirampur B.O",
          pinCode: 756049,
        },
        {
          postOffice: "Srirampur Road B.O",
          pinCode: 756023,
        },
        {
          postOffice: "Sugo B.O",
          pinCode: 756084,
        },
        {
          postOffice: "Sukhsandhapatna B.O",
          pinCode: 756036,
        },
        {
          postOffice: "Sultanpur B.O",
          pinCode: 756036,
        },
        {
          postOffice: "Sundarpur B.O",
          pinCode: 756059,
        },
        {
          postOffice: "Sunhat S.O",
          pinCode: 756002,
        },
        {
          postOffice: "Tadada B.O",
          pinCode: 756081,
        },
        {
          postOffice: "Talakurunia B.O",
          pinCode: 756044,
        },
        {
          postOffice: "Tarapur B.O",
          pinCode: 756036,
        },
        {
          postOffice: "Telipal B.O",
          pinCode: 756041,
        },
        {
          postOffice: "Tenda B.O",
          pinCode: 756041,
        },
        {
          postOffice: "Tentei B.O",
          pinCode: 756046,
        },
        {
          postOffice: "Tentulia B.O",
          pinCode: 756058,
        },
        {
          postOffice: "Thalasada B.O",
          pinCode: 756042,
        },
        {
          postOffice: "Tikirapal B.O",
          pinCode: 756020,
        },
        {
          postOffice: "Tukurihazira B.O",
          pinCode: 756037,
        },
        {
          postOffice: "Turigaria S.O",
          pinCode: 756047,
        },
        {
          postOffice: "Udambar B.O",
          pinCode: 756019,
        },
        {
          postOffice: "Udayganjapatna B.O",
          pinCode: 756039,
        },
        {
          postOffice: "Uitikiri B.O",
          pinCode: 756029,
        },
        {
          postOffice: "Upla Hat B.O",
          pinCode: 756035,
        },
        {
          postOffice: "Uppardiha B.O",
          pinCode: 756058,
        },
        {
          postOffice: "Uttareswar S.O",
          pinCode: 756045,
        },
        {
          postOffice: "Vellora B.O",
          pinCode: 756030,
        },
        {
          postOffice: "Wada B.O",
          pinCode: 756045,
        },
      ],
      Balangir: [
        {
          postOffice: "Adabahal B.O",
          pinCode: 767066,
        },
        {
          postOffice: "Agalapali B.O",
          pinCode: 767020,
        },
        {
          postOffice: "Agalpur S.O",
          pinCode: 767022,
        },
        {
          postOffice: "Alanda B.O",
          pinCode: 767033,
        },
        {
          postOffice: "Ankriapadar B.O",
          pinCode: 767002,
        },
        {
          postOffice: "Arjunda B.O",
          pinCode: 767016,
        },
        {
          postOffice: "Arjunpur B.O",
          pinCode: 767067,
        },
        {
          postOffice: "Atgaon B.O",
          pinCode: 767002,
        },
        {
          postOffice: "B.Fatkara B.O",
          pinCode: 767002,
        },
        {
          postOffice: "Badangomunda B.O",
          pinCode: 767030,
        },
        {
          postOffice: "Badbahal B.O",
          pinCode: 767067,
        },
        {
          postOffice: "Badbandh B.O",
          pinCode: 767029,
        },
        {
          postOffice: "Badbanki B.O",
          pinCode: 767060,
        },
        {
          postOffice: "Baddakala B.O",
          pinCode: 767038,
        },
        {
          postOffice: "Badibahal B.O",
          pinCode: 767020,
        },
        {
          postOffice: "Badimunda B.O",
          pinCode: 767020,
        },
        {
          postOffice: "Badsaimara B.O",
          pinCode: 767037,
        },
        {
          postOffice: "Badtika B.O",
          pinCode: 767020,
        },
        {
          postOffice: "Bagdor B.O",
          pinCode: 767026,
        },
        {
          postOffice: "Bagmund B.O",
          pinCode: 767025,
        },
        {
          postOffice: "Bahabal B.O",
          pinCode: 767026,
        },
        {
          postOffice: "Bahalpadar B.O",
          pinCode: 767002,
        },
        {
          postOffice: "Baidipali B.O",
          pinCode: 767024,
        },
        {
          postOffice: "Bairasar B.O",
          pinCode: 767016,
        },
        {
          postOffice: "Bakti B.O",
          pinCode: 767021,
        },
        {
          postOffice: "Balangir Court S.O",
          pinCode: 767001,
        },
        {
          postOffice: "Balangir H.O",
          pinCode: 767001,
        },
        {
          postOffice: "Balangir RS S.O",
          pinCode: 767001,
        },
        {
          postOffice: "Balipata B.O",
          pinCode: 767025,
        },
        {
          postOffice: "Bandhpara B.O",
          pinCode: 767029,
        },
        {
          postOffice: "Baneimunda B.O",
          pinCode: 767025,
        },
        {
          postOffice: "Banganmura S.O",
          pinCode: 767040,
        },
        {
          postOffice: "Bankel B.O",
          pinCode: 767037,
        },
        {
          postOffice: "Barbahal B.O",
          pinCode: 767027,
        },
        {
          postOffice: "Barpadar B.O",
          pinCode: 767041,
        },
        {
          postOffice: "Barpudigia B.O",
          pinCode: 767024,
        },
        {
          postOffice: "Batharla B.O",
          pinCode: 767025,
        },
        {
          postOffice: "Belgaon B.O",
          pinCode: 767032,
        },
        {
          postOffice: "Belpara B.O",
          pinCode: 767040,
        },
        {
          postOffice: "Belpara S.O",
          pinCode: 767026,
        },
        {
          postOffice: "Bender B.O",
          pinCode: 767038,
        },
        {
          postOffice: "Bendra B.O",
          pinCode: 767021,
        },
        {
          postOffice: "Bhadra B.O",
          pinCode: 767032,
        },
        {
          postOffice: "Bhainsa S.O (Balangir)",
          pinCode: 767048,
        },
        {
          postOffice: "Bhaler B.O",
          pinCode: 767002,
        },
        {
          postOffice: "Bhalumunda B.O",
          pinCode: 767040,
        },
        {
          postOffice: "Bhanpur B.O",
          pinCode: 767028,
        },
        {
          postOffice: "Bharsuja B.O",
          pinCode: 767061,
        },
        {
          postOffice: "Bhatipara S.O",
          pinCode: 767042,
        },
        {
          postOffice: "Bhundimuhan B.O",
          pinCode: 767048,
        },
        {
          postOffice: "Bhusaguda B.O",
          pinCode: 767035,
        },
        {
          postOffice: "Bhutiarbahal B.O",
          pinCode: 767029,
        },
        {
          postOffice: "Bichhubahali B.O",
          pinCode: 767039,
        },
        {
          postOffice: "Bidighat B.O",
          pinCode: 767024,
        },
        {
          postOffice: "Bijepur B.O",
          pinCode: 767033,
        },
        {
          postOffice: "Bileisarda B.O",
          pinCode: 767065,
        },
        {
          postOffice: "Binekela B.O",
          pinCode: 767033,
        },
        {
          postOffice: "Biripali B.O",
          pinCode: 767040,
        },
        {
          postOffice: "Bubel B.O",
          pinCode: 767002,
        },
        {
          postOffice: "Budhabahal B.O",
          pinCode: 767032,
        },
        {
          postOffice: "Budula B.O",
          pinCode: 767022,
        },
        {
          postOffice: "Burda B.O",
          pinCode: 767020,
        },
        {
          postOffice: "Chalki B.O",
          pinCode: 767037,
        },
        {
          postOffice: "Chandanbhati S.O",
          pinCode: 767065,
        },
        {
          postOffice: "Chandotara B.O",
          pinCode: 767035,
        },
        {
          postOffice: "Chantipala B.O",
          pinCode: 767033,
        },
        {
          postOffice: "Chatuanka B.O",
          pinCode: 767039,
        },
        {
          postOffice: "Chaulsukha B.O",
          pinCode: 767039,
        },
        {
          postOffice: "Chhatamakhana B.O",
          pinCode: 767065,
        },
        {
          postOffice: "Chhatapipal B.O",
          pinCode: 767002,
        },
        {
          postOffice: "Chuliphunka B.O",
          pinCode: 767040,
        },
        {
          postOffice: "Churapali S.O",
          pinCode: 767024,
        },
        {
          postOffice: "College Square S.O (Balangir)",
          pinCode: 767002,
        },
        {
          postOffice: "Dahimal B.O",
          pinCode: 767030,
        },
        {
          postOffice: "Damaipali B.O",
          pinCode: 767027,
        },
        {
          postOffice: "Damkipali B.O",
          pinCode: 767025,
        },
        {
          postOffice: "Darlipali B.O",
          pinCode: 767027,
        },
        {
          postOffice: "Daspur B.O",
          pinCode: 767002,
        },
        {
          postOffice: "Dedarha B.O",
          pinCode: 767027,
        },
        {
          postOffice: "Dedgaon B.O",
          pinCode: 767035,
        },
        {
          postOffice: "Deng B.O",
          pinCode: 767032,
        },
        {
          postOffice: "Deogaon S.O (Balangir)",
          pinCode: 767029,
        },
        {
          postOffice: "Desandh B.O",
          pinCode: 767029,
        },
        {
          postOffice: "Desil B.O",
          pinCode: 767033,
        },
        {
          postOffice: "Deulgaon B.O",
          pinCode: 767041,
        },
        {
          postOffice: "Deulgudi B.O",
          pinCode: 767030,
        },
        {
          postOffice: "Dhamandanga B.O",
          pinCode: 767039,
        },
        {
          postOffice: "Dhandamal B.O",
          pinCode: 767029,
        },
        {
          postOffice: "Dhandamunda B.O",
          pinCode: 767028,
        },
        {
          postOffice: "Dhanpur B.O",
          pinCode: 767046,
        },
        {
          postOffice: "Dholmandal B.O",
          pinCode: 767038,
        },
        {
          postOffice: "Duduka S.O",
          pinCode: 767061,
        },
        {
          postOffice: "Dumabhata B.O",
          pinCode: 767026,
        },
        {
          postOffice: "Dumerpita B.O",
          pinCode: 767048,
        },
        {
          postOffice: "Dungripali S.O",
          pinCode: 767023,
        },
        {
          postOffice: "Durgapali B.O",
          pinCode: 767065,
        },
        {
          postOffice: "Fatkara B.O",
          pinCode: 767024,
        },
        {
          postOffice: "Fulkimunda B.O",
          pinCode: 767038,
        },
        {
          postOffice: "G.S. Dungripali B.O",
          pinCode: 767024,
        },
        {
          postOffice: "Gaintala B.O",
          pinCode: 767002,
        },
        {
          postOffice: "Gambhari B.O",
          pinCode: 767027,
        },
        {
          postOffice: "Gandhi Nagar S.O (Balangir)",
          pinCode: 767001,
        },
        {
          postOffice: "Gandpatrapali B.O",
          pinCode: 767032,
        },
        {
          postOffice: "Gangasagar B.O",
          pinCode: 767025,
        },
        {
          postOffice: "Ganrei B.O",
          pinCode: 767037,
        },
        {
          postOffice: "Ghagurli B.O",
          pinCode: 767026,
        },
        {
          postOffice: "Ghantabahali B.O",
          pinCode: 767033,
        },
        {
          postOffice: "Ghasian B.O",
          pinCode: 767025,
        },
        {
          postOffice: "Ghuna B.O",
          pinCode: 767046,
        },
        {
          postOffice: "Ghunesh B.O",
          pinCode: 767038,
        },
        {
          postOffice: "Ghunsar B.O",
          pinCode: 767028,
        },
        {
          postOffice: "Ghunsar B.O",
          pinCode: 767032,
        },
        {
          postOffice: "Goilbhadi B.O",
          pinCode: 767033,
        },
        {
          postOffice: "Goimund B.O",
          pinCode: 767040,
        },
        {
          postOffice: "Gourgoth B.O",
          pinCode: 767067,
        },
        {
          postOffice: "Gudighat B.O",
          pinCode: 767037,
        },
        {
          postOffice: "Gudvella S.O",
          pinCode: 767046,
        },
        {
          postOffice: "Haldi B.O",
          pinCode: 767037,
        },
        {
          postOffice: "Harisankar Road S.O",
          pinCode: 767038,
        },
        {
          postOffice: "Hatpadapara S.O",
          pinCode: 767033,
        },
        {
          postOffice: "Hirapur B.O",
          pinCode: 767020,
        },
        {
          postOffice: "Ichhapara B.O",
          pinCode: 767037,
        },
        {
          postOffice: "Jagua B.O",
          pinCode: 767066,
        },
        {
          postOffice: "Jamgaon B.O",
          pinCode: 767002,
        },
        {
          postOffice: "Jamkhunta B.O",
          pinCode: 767035,
        },
        {
          postOffice: "Jamut B.O",
          pinCode: 767046,
        },
        {
          postOffice: "Jarasingha S.O",
          pinCode: 767067,
        },
        {
          postOffice: "Jhankarpali B.O",
          pinCode: 767065,
        },
        {
          postOffice: "Jharial B.O",
          pinCode: 767040,
        },
        {
          postOffice: "Jharnipali B.O",
          pinCode: 767061,
        },
        {
          postOffice: "Jogimunda S.O",
          pinCode: 767027,
        },
        {
          postOffice: "Jogisarda B.O",
          pinCode: 767020,
        },
        {
          postOffice: "Juba B.O",
          pinCode: 767025,
        },
        {
          postOffice: "Jurabandh B.O",
          pinCode: 767026,
        },
        {
          postOffice: "K. Larambha B.O",
          pinCode: 767025,
        },
        {
          postOffice: "Kamarlaga B.O",
          pinCode: 767032,
        },
        {
          postOffice: "Kandajuri B.O",
          pinCode: 767020,
        },
        {
          postOffice: "Kandhenjhula B.O",
          pinCode: 767027,
        },
        {
          postOffice: "Kandhkelgaon B.O",
          pinCode: 767029,
        },
        {
          postOffice: "Kantabanji Bazar S.O",
          pinCode: 767039,
        },
        {
          postOffice: "Kantabanji S.O",
          pinCode: 767039,
        },
        {
          postOffice: "Kanut B.O",
          pinCode: 767026,
        },
        {
          postOffice: "Kapalabhata B.O",
          pinCode: 767040,
        },
        {
          postOffice: "Kapani B.O",
          pinCode: 767026,
        },
        {
          postOffice: "Kapsila B.O",
          pinCode: 767030,
        },
        {
          postOffice: "Karamtala B.O",
          pinCode: 767032,
        },
        {
          postOffice: "Katarkela B.O",
          pinCode: 767033,
        },
        {
          postOffice: "Kendumundi B.O",
          pinCode: 767025,
        },
        {
          postOffice: "Khagsa B.O",
          pinCode: 767039,
        },
        {
          postOffice: "Khaira B.O",
          pinCode: 767040,
        },
        {
          postOffice: "Khairmal B.O",
          pinCode: 767026,
        },
        {
          postOffice: "Khaliapali B.O",
          pinCode: 767020,
        },
        {
          postOffice: "Khalipathar B.O",
          pinCode: 767026,
        },
        {
          postOffice: "Khaprakhol S.O",
          pinCode: 767028,
        },
        {
          postOffice: "Kharjura B.O",
          pinCode: 767002,
        },
        {
          postOffice: "Khasbahal B.O",
          pinCode: 767032,
        },
        {
          postOffice: "Kholan S.O",
          pinCode: 767066,
        },
        {
          postOffice: "Khujenbahali B.O",
          pinCode: 767039,
        },
        {
          postOffice: "Khujenpali B.O",
          pinCode: 767002,
        },
        {
          postOffice: "Khuntsamalei B.O",
          pinCode: 767025,
        },
        {
          postOffice: "Kuanrgaon B.O",
          pinCode: 767032,
        },
        {
          postOffice: "Kudasingha B.O",
          pinCode: 767029,
        },
        {
          postOffice: "Kuibahal B.O",
          pinCode: 767060,
        },
        {
          postOffice: "Kukurahad B.O",
          pinCode: 767039,
        },
        {
          postOffice: "Kultapara B.O",
          pinCode: 767067,
        },
        {
          postOffice: "Kumbhari B.O",
          pinCode: 767032,
        },
        {
          postOffice: "Kursud B.O",
          pinCode: 767035,
        },
        {
          postOffice: "Kurul B.O",
          pinCode: 767002,
        },
        {
          postOffice: "Kusang B.O",
          pinCode: 767065,
        },
        {
          postOffice: "Kushmel B.O",
          pinCode: 767065,
        },
        {
          postOffice: "Kuskela B.O",
          pinCode: 767066,
        },
        {
          postOffice: "Kutasingha B.O",
          pinCode: 767068,
        },
        {
          postOffice: "Kutmunda B.O",
          pinCode: 767041,
        },
        {
          postOffice: "Landapathar B.O",
          pinCode: 767029,
        },
        {
          postOffice: "Lebda B.O",
          pinCode: 767033,
        },
        {
          postOffice: "Lenjha B.O",
          pinCode: 767033,
        },
        {
          postOffice: "Loisingha S.O",
          pinCode: 767020,
        },
        {
          postOffice: "Luhasingha B.O",
          pinCode: 767027,
        },
        {
          postOffice: "Luthurbandh B.O",
          pinCode: 767033,
        },
        {
          postOffice: "Mahakhand B.O",
          pinCode: 767040,
        },
        {
          postOffice: "Mahalei B.O",
          pinCode: 767067,
        },
        {
          postOffice: "Maharapadar B.O",
          pinCode: 767028,
        },
        {
          postOffice: "Mahimunda B.O",
          pinCode: 767002,
        },
        {
          postOffice: "Mahulbahali B.O",
          pinCode: 767060,
        },
        {
          postOffice: "Mahulpati B.O",
          pinCode: 767038,
        },
        {
          postOffice: "Maingaon B.O",
          pinCode: 767033,
        },
        {
          postOffice: "Makundpur B.O",
          pinCode: 767002,
        },
        {
          postOffice: "Malisira B.O",
          pinCode: 767037,
        },
        {
          postOffice: "Malmunda B.O",
          pinCode: 767002,
        },
        {
          postOffice: "Malpara B.O",
          pinCode: 767038,
        },
        {
          postOffice: "Mandal B.O",
          pinCode: 767026,
        },
        {
          postOffice: "Manhira B.O",
          pinCode: 767020,
        },
        {
          postOffice: "Manoharpur B.O",
          pinCode: 767002,
        },
        {
          postOffice: "Marlad B.O",
          pinCode: 767066,
        },
        {
          postOffice: "Marwari Bazar S.O",
          pinCode: 767001,
        },
        {
          postOffice: "Matikhai B.O",
          pinCode: 767027,
        },
        {
          postOffice: "Mayabarha B.O",
          pinCode: 767048,
        },
        {
          postOffice: "Mirdhapali B.O",
          pinCode: 767065,
        },
        {
          postOffice: "Mudghat B.O",
          pinCode: 767048,
        },
        {
          postOffice: "Mundomahul B.O",
          pinCode: 767025,
        },
        {
          postOffice: "Mundpadar B.O",
          pinCode: 767040,
        },
        {
          postOffice: "Muribahal S.O",
          pinCode: 767037,
        },
        {
          postOffice: "Mursingh B.O",
          pinCode: 767029,
        },
        {
          postOffice: "Mursundhi B.O",
          pinCode: 767021,
        },
        {
          postOffice: "Nagaon B.O",
          pinCode: 767020,
        },
        {
          postOffice: "Nagaon B.O",
          pinCode: 767022,
        },
        {
          postOffice: "Nandupala B.O",
          pinCode: 767028,
        },
        {
          postOffice: "Naren B.O",
          pinCode: 767066,
        },
        {
          postOffice: "Nuapara B.O",
          pinCode: 767030,
        },
        {
          postOffice: "Of Badmal S.O",
          pinCode: 767070,
        },
        {
          postOffice: "P.Rampur S.O",
          pinCode: 767041,
        },
        {
          postOffice: "Padhel B.O",
          pinCode: 767025,
        },
        {
          postOffice: "Padiabahal B.O",
          pinCode: 767028,
        },
        {
          postOffice: "Pandamunda B.O",
          pinCode: 767027,
        },
        {
          postOffice: "Pandesara B.O",
          pinCode: 767061,
        },
        {
          postOffice: "Parasara B.O",
          pinCode: 767035,
        },
        {
          postOffice: "Pardhiapali B.O",
          pinCode: 767020,
        },
        {
          postOffice: "Patharla B.O",
          pinCode: 767002,
        },
        {
          postOffice: "Patnagarh Bazar S.O",
          pinCode: 767025,
        },
        {
          postOffice: "Patnagarh S.O",
          pinCode: 767025,
        },
        {
          postOffice: "Patrapali B.O",
          pinCode: 767037,
        },
        {
          postOffice: "Patuapali B.O",
          pinCode: 767021,
        },
        {
          postOffice: "Phatamunda B.O",
          pinCode: 767025,
        },
        {
          postOffice: "Pipirda B.O",
          pinCode: 767065,
        },
        {
          postOffice: "Puintala B.O",
          pinCode: 767002,
        },
        {
          postOffice: "Rajendra College S.O (Balangir)",
          pinCode: 767002,
        },
        {
          postOffice: "Ramchandrapur B.O",
          pinCode: 767048,
        },
        {
          postOffice: "Rampur B.O",
          pinCode: 767021,
        },
        {
          postOffice: "Randa B.O",
          pinCode: 767002,
        },
        {
          postOffice: "Rengali B.O",
          pinCode: 767024,
        },
        {
          postOffice: "Rengali B.O",
          pinCode: 767028,
        },
        {
          postOffice: "Rengali B.O",
          pinCode: 767022,
        },
        {
          postOffice: "Rigdol B.O",
          pinCode: 767033,
        },
        {
          postOffice: "Rinbachan B.O",
          pinCode: 767022,
        },
        {
          postOffice: "Roth B.O",
          pinCode: 767061,
        },
        {
          postOffice: "Rugudi Para S.O",
          pinCode: 767001,
        },
        {
          postOffice: "Rusuda B.O",
          pinCode: 767067,
        },
        {
          postOffice: "Sadeipali B.O",
          pinCode: 767065,
        },
        {
          postOffice: "Sahajbahal B.O",
          pinCode: 767024,
        },
        {
          postOffice: "Saintala S.O",
          pinCode: 767032,
        },
        {
          postOffice: "Sakma B.O",
          pinCode: 767020,
        },
        {
          postOffice: "Salandi B.O",
          pinCode: 767026,
        },
        {
          postOffice: "Salebarat B.O",
          pinCode: 767035,
        },
        {
          postOffice: "Salebhata S.O",
          pinCode: 767021,
        },
        {
          postOffice: "Salemudga B.O",
          pinCode: 767060,
        },
        {
          postOffice: "Salepali B.O",
          pinCode: 767067,
        },
        {
          postOffice: "Samra B.O",
          pinCode: 767030,
        },
        {
          postOffice: "Sanmula B.O",
          pinCode: 767040,
        },
        {
          postOffice: "Sargad B.O",
          pinCode: 767020,
        },
        {
          postOffice: "Sargul B.O",
          pinCode: 767039,
        },
        {
          postOffice: "Sarmuhan B.O",
          pinCode: 767026,
        },
        {
          postOffice: "Sauntput B.O",
          pinCode: 767065,
        },
        {
          postOffice: "Sibtala B.O",
          pinCode: 767024,
        },
        {
          postOffice: "Sihini B.O",
          pinCode: 767066,
        },
        {
          postOffice: "Sikachhida B.O",
          pinCode: 767029,
        },
        {
          postOffice: "Siker B.O",
          pinCode: 767033,
        },
        {
          postOffice: "Sikuan B.O",
          pinCode: 767029,
        },
        {
          postOffice: "Sindhekela S.O",
          pinCode: 767035,
        },
        {
          postOffice: "Sirul B.O",
          pinCode: 767033,
        },
        {
          postOffice: "Siskela B.O",
          pinCode: 767032,
        },
        {
          postOffice: "Solbandh B.O",
          pinCode: 767025,
        },
        {
          postOffice: "Sudpara S.O",
          pinCode: 767001,
        },
        {
          postOffice: "Sulekela B.O",
          pinCode: 767026,
        },
        {
          postOffice: "Sunamudi B.O",
          pinCode: 767038,
        },
        {
          postOffice: "Sunamudi B.O",
          pinCode: 767041,
        },
        {
          postOffice: "Taliudar B.O",
          pinCode: 767065,
        },
        {
          postOffice: "Talpalipara S.O",
          pinCode: 767001,
        },
        {
          postOffice: "Tamia B.O",
          pinCode: 767025,
        },
        {
          postOffice: "Tandigaon B.O",
          pinCode: 767030,
        },
        {
          postOffice: "Tankapani B.O",
          pinCode: 767038,
        },
        {
          postOffice: "Telenpali B.O",
          pinCode: 767028,
        },
        {
          postOffice: "Tendapadar B.O",
          pinCode: 767041,
        },
        {
          postOffice: "Tentulikhunti B.O",
          pinCode: 767037,
        },
        {
          postOffice: "Thelkomunda B.O",
          pinCode: 767016,
        },
        {
          postOffice: "Tikrapara B.O",
          pinCode: 767026,
        },
        {
          postOffice: "Tikrapara S.O",
          pinCode: 767001,
        },
        {
          postOffice: "Titilagarh Bazar S.O",
          pinCode: 767033,
        },
        {
          postOffice: "Titilagarh Court S.O",
          pinCode: 767033,
        },
        {
          postOffice: "Titilagarh S.O",
          pinCode: 767033,
        },
        {
          postOffice: "Titisilet B.O",
          pinCode: 767035,
        },
        {
          postOffice: "Totopara B.O",
          pinCode: 767033,
        },
        {
          postOffice: "Turekela S.O",
          pinCode: 767060,
        },
        {
          postOffice: "Turla B.O",
          pinCode: 767028,
        },
        {
          postOffice: "Tusra S.O",
          pinCode: 767030,
        },
        {
          postOffice: "Udar B.O",
          pinCode: 767067,
        },
        {
          postOffice: "Udiapali B.O",
          pinCode: 767028,
        },
        {
          postOffice: "Ulba B.O",
          pinCode: 767041,
        },
        {
          postOffice: "Uparjhar B.O",
          pinCode: 767067,
        },
      ],
      Boudh: [
        {
          postOffice: "Adenigarh B.O",
          pinCode: 762023,
        },
        {
          postOffice: "Ainlapalli B.O",
          pinCode: 762015,
        },
        {
          postOffice: "Arakhapadar B.O",
          pinCode: 762020,
        },
        {
          postOffice: "Badabandha B.O",
          pinCode: 762013,
        },
        {
          postOffice: "Badachhapalli B.O",
          pinCode: 762017,
        },
        {
          postOffice: "Badhigaon B.O",
          pinCode: 762026,
        },
        {
          postOffice: "Badiketa B.O",
          pinCode: 762015,
        },
        {
          postOffice: "Baghiabahal S.O",
          pinCode: 762030,
        },
        {
          postOffice: "Baghiapada B.O",
          pinCode: 762026,
        },
        {
          postOffice: "Bahira B.O",
          pinCode: 762015,
        },
        {
          postOffice: "Balakira B.O",
          pinCode: 762015,
        },
        {
          postOffice: "Balanda B.O",
          pinCode: 762013,
        },
        {
          postOffice: "Balasinga B.O",
          pinCode: 762014,
        },
        {
          postOffice: "Bamanda B.O",
          pinCode: 762024,
        },
        {
          postOffice: "Bandhapathar B.O",
          pinCode: 762026,
        },
        {
          postOffice: "Barabapadr B.O",
          pinCode: 762030,
        },
        {
          postOffice: "Baragaon B.O",
          pinCode: 762017,
        },
        {
          postOffice: "Baragochha B.O",
          pinCode: 762016,
        },
        {
          postOffice: "Bhejigora B.O",
          pinCode: 762020,
        },
        {
          postOffice: "Bilabadi B.O",
          pinCode: 762024,
        },
        {
          postOffice: "Bilaspur B.O",
          pinCode: 762016,
        },
        {
          postOffice: "Biramchandrapur B.O",
          pinCode: 762024,
        },
        {
          postOffice: "Biranarasinghpur S.O",
          pinCode: 762024,
        },
        {
          postOffice: "Birigarh B.O",
          pinCode: 762026,
        },
        {
          postOffice: "Boudh Court S.O",
          pinCode: 762014,
        },
        {
          postOffice: "Boudhbazar S.O",
          pinCode: 762014,
        },
        {
          postOffice: "Boudhraj S.O",
          pinCode: 762014,
        },
        {
          postOffice: "Bounsoni S.O",
          pinCode: 762015,
        },
        {
          postOffice: "Brahmanpalli B.O",
          pinCode: 762014,
        },
        {
          postOffice: "Butupalli B.O",
          pinCode: 762014,
        },
        {
          postOffice: "Charada B.O",
          pinCode: 762014,
        },
        {
          postOffice: "Chhatranga B.O",
          pinCode: 762020,
        },
        {
          postOffice: "Dahya B.O",
          pinCode: 762015,
        },
        {
          postOffice: "Damamunda B.O",
          pinCode: 762016,
        },
        {
          postOffice: "Dapalla B.O",
          pinCode: 762030,
        },
        {
          postOffice: "Devgarh B.O",
          pinCode: 762024,
        },
        {
          postOffice: "Dhadalapada B.O",
          pinCode: 762026,
        },
        {
          postOffice: "Dhalapur B.O",
          pinCode: 762013,
        },
        {
          postOffice: "Fased B.O",
          pinCode: 762018,
        },
        {
          postOffice: "Gabjore B.O",
          pinCode: 762030,
        },
        {
          postOffice: "Gandapaju B.O",
          pinCode: 762012,
        },
        {
          postOffice: "Gandisara B.O",
          pinCode: 762012,
        },
        {
          postOffice: "Ghantapada S.O",
          pinCode: 762018,
        },
        {
          postOffice: "Gudvellipadar B.O",
          pinCode: 762016,
        },
        {
          postOffice: "Gundribida B.O",
          pinCode: 762023,
        },
        {
          postOffice: "Gundulia B.O",
          pinCode: 762015,
        },
        {
          postOffice: "Harabhanga S.O",
          pinCode: 762020,
        },
        {
          postOffice: "Jagati B.O",
          pinCode: 762014,
        },
        {
          postOffice: "Janhapanka B.O",
          pinCode: 762014,
        },
        {
          postOffice: "Jhadrajing S.O",
          pinCode: 762023,
        },
        {
          postOffice: "Jogindrapur B.O",
          pinCode: 762016,
        },
        {
          postOffice: "Juramunda B.O",
          pinCode: 762015,
        },
        {
          postOffice: "Kamira B.O",
          pinCode: 762014,
        },
        {
          postOffice: "Kampara B.O",
          pinCode: 762015,
        },
        {
          postOffice: "Kankala B.O",
          pinCode: 762015,
        },
        {
          postOffice: "Kantamal S.O",
          pinCode: 762017,
        },
        {
          postOffice: "Karadi B.O",
          pinCode: 762024,
        },
        {
          postOffice: "Karanjakata B.O",
          pinCode: 762023,
        },
        {
          postOffice: "Kasurbandha B.O",
          pinCode: 762015,
        },
        {
          postOffice: "Kelakata B.O",
          pinCode: 762024,
        },
        {
          postOffice: "Khairmal B.O",
          pinCode: 762016,
        },
        {
          postOffice: "Khaliapalli B.O",
          pinCode: 762030,
        },
        {
          postOffice: "Khamariapada B.O",
          pinCode: 762014,
        },
        {
          postOffice: "Khandahata B.O",
          pinCode: 762013,
        },
        {
          postOffice: "Kharabhuin B.O",
          pinCode: 762020,
        },
        {
          postOffice: "Khatakatia B.O",
          pinCode: 762030,
        },
        {
          postOffice: "Khuntabandha B.O",
          pinCode: 762014,
        },
        {
          postOffice: "Khuntiapada B.O",
          pinCode: 762026,
        },
        {
          postOffice: "Kultajore B.O",
          pinCode: 762018,
        },
        {
          postOffice: "Kumari B.O",
          pinCode: 762020,
        },
        {
          postOffice: "Kusanga B.O",
          pinCode: 762020,
        },
        {
          postOffice: "Laxmanpur B.O",
          pinCode: 762023,
        },
        {
          postOffice: "Laxmiprasad B.O",
          pinCode: 762014,
        },
        {
          postOffice: "Lokapada B.O",
          pinCode: 762030,
        },
        {
          postOffice: "Lunibahal B.O",
          pinCode: 762024,
        },
        {
          postOffice: "Madhapur B.O",
          pinCode: 762012,
        },
        {
          postOffice: "Mahallickpada B.O",
          pinCode: 762020,
        },
        {
          postOffice: "Mallisahi S.O",
          pinCode: 762014,
        },
        {
          postOffice: "Manamunda S.O",
          pinCode: 762016,
        },
        {
          postOffice: "Manupalli B.O",
          pinCode: 762015,
        },
        {
          postOffice: "Marjakud B.O",
          pinCode: 762014,
        },
        {
          postOffice: "Masinogora B.O",
          pinCode: 762018,
        },
        {
          postOffice: "Mathura B.O",
          pinCode: 762024,
        },
        {
          postOffice: "Mundapada B.O",
          pinCode: 762014,
        },
        {
          postOffice: "Mundipadar B.O",
          pinCode: 762015,
        },
        {
          postOffice: "Murusundhi B.O",
          pinCode: 762014,
        },
        {
          postOffice: "Narayan Prasad B.O",
          pinCode: 762017,
        },
        {
          postOffice: "Nuapalli B.O",
          pinCode: 762015,
        },
        {
          postOffice: "Nuapalli B.O",
          pinCode: 762018,
        },
        {
          postOffice: "Padarpada B.O",
          pinCode: 762016,
        },
        {
          postOffice: "Palaspat B.O",
          pinCode: 762014,
        },
        {
          postOffice: "Purunakatak S.O",
          pinCode: 762013,
        },
        {
          postOffice: "Rambhikata B.O",
          pinCode: 762024,
        },
        {
          postOffice: "Ramgarh B.O",
          pinCode: 762013,
        },
        {
          postOffice: "Ranipathar B.O",
          pinCode: 762023,
        },
        {
          postOffice: "Roxa B.O",
          pinCode: 762015,
        },
        {
          postOffice: "Rundimahal B.O",
          pinCode: 762030,
        },
        {
          postOffice: "Rusibandha B.O",
          pinCode: 762015,
        },
        {
          postOffice: "Sagada B.O",
          pinCode: 762016,
        },
        {
          postOffice: "Salki B.O",
          pinCode: 762026,
        },
        {
          postOffice: "Sampoch B.O",
          pinCode: 762024,
        },
        {
          postOffice: "Sanachhapalli B.O",
          pinCode: 762017,
        },
        {
          postOffice: "Sangochhapada B.O",
          pinCode: 762015,
        },
        {
          postOffice: "Sangrampur B.O",
          pinCode: 762015,
        },
        {
          postOffice: "Sankulei B.O",
          pinCode: 762020,
        },
        {
          postOffice: "Sarsara S.O",
          pinCode: 762026,
        },
        {
          postOffice: "Satakhanda B.O",
          pinCode: 762020,
        },
        {
          postOffice: "Similipadar B.O",
          pinCode: 762030,
        },
        {
          postOffice: "Srimal B.O",
          pinCode: 762017,
        },
        {
          postOffice: "Sundhipadar B.O",
          pinCode: 762016,
        },
        {
          postOffice: "Telibandha B.O",
          pinCode: 762014,
        },
        {
          postOffice: "Tetelenga B.O",
          pinCode: 762014,
        },
        {
          postOffice: "Tikiripada B.O",
          pinCode: 762026,
        },
        {
          postOffice: "Tilapanga B.O",
          pinCode: 762015,
        },
        {
          postOffice: "Tileswar B.O",
          pinCode: 762013,
        },
        {
          postOffice: "Tundamal B.O",
          pinCode: 762016,
        },
        {
          postOffice: "Uden B.O",
          pinCode: 762018,
        },
        {
          postOffice: "Uma B.O",
          pinCode: 762018,
        },
      ],
      Cuttack: [
        {
          postOffice: "A D Market S.O",
          pinCode: 753012,
        },
        {
          postOffice: "Abhimanpur B.O",
          pinCode: 754035,
        },
        {
          postOffice: "Achalkote B.O",
          pinCode: 754030,
        },
        {
          postOffice: "Adaspur S.O",
          pinCode: 754011,
        },
        {
          postOffice: "Adheigundi B.O",
          pinCode: 754037,
        },
        {
          postOffice: "Agrahat B.O",
          pinCode: 754028,
        },
        {
          postOffice: "Agyanpur B.O",
          pinCode: 754209,
        },
        {
          postOffice: "Alara B.O",
          pinCode: 754032,
        },
        {
          postOffice: "Angeswarpada B.O",
          pinCode: 754113,
        },
        {
          postOffice: "Anlo B.O",
          pinCode: 754010,
        },
        {
          postOffice: "Annuary B.O",
          pinCode: 754009,
        },
        {
          postOffice: "Arakhapatna B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Asureswar S.O",
          pinCode: 754209,
        },
        {
          postOffice: "Athagarh Bazar S.O",
          pinCode: 754295,
        },
        {
          postOffice: "Athagarh College S.O",
          pinCode: 754029,
        },
        {
          postOffice: "Athagarh H.O",
          pinCode: 754029,
        },
        {
          postOffice: "Avinab Bidanasi S.O",
          pinCode: 753014,
        },
        {
          postOffice: "Ayatpur B.O",
          pinCode: 754131,
        },
        {
          postOffice: "B B Garh B.O",
          pinCode: 754004,
        },
        {
          postOffice: "B G P Pur B.O",
          pinCode: 754005,
        },
        {
          postOffice: "Babujang B.O",
          pinCode: 754134,
        },
        {
          postOffice: "Badabhuin B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Badagotha B.O",
          pinCode: 754221,
        },
        {
          postOffice: "Badakambilo B.O",
          pinCode: 754031,
        },
        {
          postOffice: "Badamulei B.O",
          pinCode: 754018,
        },
        {
          postOffice: "Badanauput B.O",
          pinCode: 754030,
        },
        {
          postOffice: "Badasamantarapur B.O",
          pinCode: 754028,
        },
        {
          postOffice: "Bagalsahi B.O",
          pinCode: 754004,
        },
        {
          postOffice: "Baghilo Bamanpur B.O",
          pinCode: 754208,
        },
        {
          postOffice: "Baghuni B.O",
          pinCode: 754209,
        },
        {
          postOffice: "Bahugram S.O",
          pinCode: 754200,
        },
        {
          postOffice: "Baideswar B.O",
          pinCode: 754009,
        },
        {
          postOffice: "Bainchua B.O",
          pinCode: 754022,
        },
        {
          postOffice: "Bairoi S.O",
          pinCode: 754010,
        },
        {
          postOffice: "Bajrakabari Road S.O",
          pinCode: 753001,
        },
        {
          postOffice: "Balabhadrapur B.O",
          pinCode: 754009,
        },
        {
          postOffice: "Balarampur B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Bali B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Balijhari B.O",
          pinCode: 754037,
        },
        {
          postOffice: "Balisahi B.O",
          pinCode: 754032,
        },
        {
          postOffice: "Bamangadia B.O",
          pinCode: 754031,
        },
        {
          postOffice: "Banamalipur B.O",
          pinCode: 754031,
        },
        {
          postOffice: "Banda B.O",
          pinCode: 754131,
        },
        {
          postOffice: "Bandalo B.O",
          pinCode: 754030,
        },
        {
          postOffice: "Bandhahuda B.O",
          pinCode: 754032,
        },
        {
          postOffice: "Bangarisinga B.O",
          pinCode: 754031,
        },
        {
          postOffice: "Banguary B.O",
          pinCode: 754001,
        },
        {
          postOffice: "Bania B.O",
          pinCode: 754009,
        },
        {
          postOffice: "Banki College S.O",
          pinCode: 754008,
        },
        {
          postOffice: "Banki S.O (Cuttack)",
          pinCode: 754008,
        },
        {
          postOffice: "Banki Tulasipur B.O",
          pinCode: 754008,
        },
        {
          postOffice: "Banra B.O",
          pinCode: 754006,
        },
        {
          postOffice: "Barambagarh S.O",
          pinCode: 754031,
        },
        {
          postOffice: "Barang S.O",
          pinCode: 754005,
        },
        {
          postOffice: "Basudevpur B.O",
          pinCode: 754204,
        },
        {
          postOffice: "Baunsput B.O",
          pinCode: 754030,
        },
        {
          postOffice: "Belgachhia B.O",
          pinCode: 754005,
        },
        {
          postOffice: "Beliapal B.O",
          pinCode: 754031,
        },
        {
          postOffice: "Bentakar S.O",
          pinCode: 754112,
        },
        {
          postOffice: "Bentapada B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Bhagabanpur B.O",
          pinCode: 754293,
        },
        {
          postOffice: "Bhagabatpur B.O",
          pinCode: 754208,
        },
        {
          postOffice: "Bhagatpur B.O",
          pinCode: 754022,
        },
        {
          postOffice: "Bhairapur B.O",
          pinCode: 754200,
        },
        {
          postOffice: "Bhakuda B.O",
          pinCode: 754204,
        },
        {
          postOffice: "Bhanpur B.O",
          pinCode: 753011,
        },
        {
          postOffice: "Bhatapada B.O",
          pinCode: 754200,
        },
        {
          postOffice: "Bhatimunda B.O",
          pinCode: 754022,
        },
        {
          postOffice: "Bhera B.O",
          pinCode: 754290,
        },
        {
          postOffice: "Bhimdaspur B.O",
          pinCode: 754221,
        },
        {
          postOffice: "Bhimrajpur B.O",
          pinCode: 754201,
        },
        {
          postOffice: "Bidanasi B.O",
          pinCode: 753014,
        },
        {
          postOffice: "Bilasuni B.O",
          pinCode: 754004,
        },
        {
          postOffice: "Billipada B.O",
          pinCode: 754008,
        },
        {
          postOffice: "Bindhanima B.O",
          pinCode: 754030,
        },
        {
          postOffice: "Biribati S.O",
          pinCode: 754100,
        },
        {
          postOffice: "Birol B.O",
          pinCode: 754025,
        },
        {
          postOffice: "Bisanpur B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Bodamundai B.O",
          pinCode: 754202,
        },
        {
          postOffice: "Bodhanga B.O",
          pinCode: 754207,
        },
        {
          postOffice: "Bodhapur B.O",
          pinCode: 754130,
        },
        {
          postOffice: "Bramhanda B.O",
          pinCode: 754003,
        },
        {
          postOffice: "Bramhansailo S.O",
          pinCode: 754018,
        },
        {
          postOffice: "Bramhapura B.O",
          pinCode: 754008,
        },
        {
          postOffice: "C R R I S.O (Cuttack)",
          pinCode: 753006,
        },
        {
          postOffice: "Cantonment Road S.O",
          pinCode: 753001,
        },
        {
          postOffice: "Chakada B.O",
          pinCode: 753006,
        },
        {
          postOffice: "Champatipur B.O",
          pinCode: 754206,
        },
        {
          postOffice: "Champeswar B.O",
          pinCode: 754037,
        },
        {
          postOffice: "Chandaka B.O",
          pinCode: 754005,
        },
        {
          postOffice: "Chandinchowk H.O",
          pinCode: 753002,
        },
        {
          postOffice: "Chandol S.O",
          pinCode: 754208,
        },
        {
          postOffice: "Charbatia S.O",
          pinCode: 754028,
        },
        {
          postOffice: "Charirakaba B.O",
          pinCode: 754293,
        },
        {
          postOffice: "Chasakhanda B.O",
          pinCode: 754290,
        },
        {
          postOffice: "Chasapara S.O",
          pinCode: 754027,
        },
        {
          postOffice: "Chauliaganj S.O",
          pinCode: 753004,
        },
        {
          postOffice: "Chayanpal B.O",
          pinCode: 754204,
        },
        {
          postOffice: "Chhagaon B.O",
          pinCode: 754028,
        },
        {
          postOffice: "Chhanipur B.O",
          pinCode: 754202,
        },
        {
          postOffice: "Chhatra Bazar S.O",
          pinCode: 753003,
        },
        {
          postOffice: "Choudhury Bazar S.O",
          pinCode: 753001,
        },
        {
          postOffice: "Choudwar Bazar S.O",
          pinCode: 754025,
        },
        {
          postOffice: "Choudwar S.O",
          pinCode: 754025,
        },
        {
          postOffice: "College Square S.O (Cuttack)",
          pinCode: 753003,
        },
        {
          postOffice: "Cuttack G.P.O.",
          pinCode: 753001,
        },
        {
          postOffice: "Dadhibabanpur B.O",
          pinCode: 754112,
        },
        {
          postOffice: "Dagarpara S.O",
          pinCode: 753002,
        },
        {
          postOffice: "Dalijoda Berhampur B.O",
          pinCode: 754028,
        },
        {
          postOffice: "Damodarpur B.O",
          pinCode: 754130,
        },
        {
          postOffice: "Dargha Bazar S.O",
          pinCode: 753001,
        },
        {
          postOffice: "Daruthenga B.O",
          pinCode: 754005,
        },
        {
          postOffice: "Dasarathipur B.O",
          pinCode: 754031,
        },
        {
          postOffice: "Daulatabad S.O (Cuttack)",
          pinCode: 754026,
        },
        {
          postOffice: "Debabumi B.O",
          pinCode: 754032,
        },
        {
          postOffice: "Dhaipur B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Dhansarpatna B.O",
          pinCode: 754008,
        },
        {
          postOffice: "Dharibil B.O",
          pinCode: 754134,
        },
        {
          postOffice: "Dharmadaspur B.O",
          pinCode: 754204,
        },
        {
          postOffice: "Dhurusia B.O",
          pinCode: 754027,
        },
        {
          postOffice: "Dompara S.O",
          pinCode: 754007,
        },
        {
          postOffice: "Dorada B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Dulanapur B.O",
          pinCode: 754007,
        },
        {
          postOffice: "Durgapur B.O",
          pinCode: 754008,
        },
        {
          postOffice: "Ekdal B.O",
          pinCode: 754037,
        },
        {
          postOffice: "Eranch B.O",
          pinCode: 754105,
        },
        {
          postOffice: "Fakirpada B.O",
          pinCode: 754100,
        },
        {
          postOffice: "Fulapada B.O",
          pinCode: 754032,
        },
        {
          postOffice: "Fulnakhara S.O",
          pinCode: 754001,
        },
        {
          postOffice: "G R C Pur B.O",
          pinCode: 754007,
        },
        {
          postOffice: "G.Nahalpur B.O",
          pinCode: 754003,
        },
        {
          postOffice: "Gadadharpur B.O",
          pinCode: 754030,
        },
        {
          postOffice: "Gadapokhari B.O",
          pinCode: 754031,
        },
        {
          postOffice: "Gandhi Bhawan S.O (Cuttack)",
          pinCode: 753001,
        },
        {
          postOffice: "Garudagaon B.O",
          pinCode: 754022,
        },
        {
          postOffice: "Gatiroutpatna B.O",
          pinCode: 754100,
        },
        {
          postOffice: "Gayal Banka B.O",
          pinCode: 754007,
        },
        {
          postOffice: "Ghantalo B.O",
          pinCode: 754209,
        },
        {
          postOffice: "Ghasiput B.O",
          pinCode: 754008,
        },
        {
          postOffice: "Gholapur B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Gobabasta B.O",
          pinCode: 754001,
        },
        {
          postOffice: "Gobara B.O",
          pinCode: 754028,
        },
        {
          postOffice: "Godibandha B.O",
          pinCode: 754037,
        },
        {
          postOffice: "Godijanga B.O",
          pinCode: 754134,
        },
        {
          postOffice: "Godisahi B.O",
          pinCode: 754006,
        },
        {
          postOffice: "Gokana B.O",
          pinCode: 754206,
        },
        {
          postOffice: "Gopalpur B.O",
          pinCode: 754207,
        },
        {
          postOffice: "Gopalpur S.O (Cuttack",
          pinCode: 753011,
        },
        {
          postOffice: "Gopamathura B.O",
          pinCode: 754031,
        },
        {
          postOffice: "Gopapur B.O",
          pinCode: 754031,
        },
        {
          postOffice: "Gopinathpur B.O",
          pinCode: 754200,
        },
        {
          postOffice: "Gotara B.O",
          pinCode: 754207,
        },
        {
          postOffice: "Goudagopa B.O",
          pinCode: 754207,
        },
        {
          postOffice: "Govindpur S.O (Cuttack)",
          pinCode: 754003,
        },
        {
          postOffice: "Gurudijhatia B.O",
          pinCode: 754028,
        },
        {
          postOffice: "Haladia B.Ojpur B.O",
          pinCode: 754209,
        },
        {
          postOffice: "Harirajpur B.O",
          pinCode: 754008,
        },
        {
          postOffice: "Ichhapur B.O",
          pinCode: 754031,
        },
        {
          postOffice: "Ichhapur B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Industrial Estate S.O (Cuttack)",
          pinCode: 753010,
        },
        {
          postOffice: "Jagatpur S.O (Cuttack)",
          pinCode: 754021,
        },
        {
          postOffice: "Jahangar B.O",
          pinCode: 754208,
        },
        {
          postOffice: "Jallarpur B.O",
          pinCode: 754004,
        },
        {
          postOffice: "Janhimula B.O",
          pinCode: 754208,
        },
        {
          postOffice: "Jaripada B.O",
          pinCode: 754201,
        },
        {
          postOffice: "Jenapada B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Jhadeswarpur B.O",
          pinCode: 754207,
        },
        {
          postOffice: "Jhajia B.O",
          pinCode: 754031,
        },
        {
          postOffice: "Jharkata B.O",
          pinCode: 754112,
        },
        {
          postOffice: "Jhinkiria Berhampur B.O",
          pinCode: 754112,
        },
        {
          postOffice: "Jillinda B.O",
          pinCode: 754032,
        },
        {
          postOffice: "Jobra S.O",
          pinCode: 753003,
        },
        {
          postOffice: "Jodamuhana B.O",
          pinCode: 754031,
        },
        {
          postOffice: "Jodumu B.O",
          pinCode: 754032,
        },
        {
          postOffice: "Kadalibadi B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Kafla S.O",
          pinCode: 753002,
        },
        {
          postOffice: "Kaitha B.O",
          pinCode: 754023,
        },
        {
          postOffice: "Kalapada B.O",
          pinCode: 754112,
        },
        {
          postOffice: "Kalapathar S.O (Cuttack)",
          pinCode: 754009,
        },
        {
          postOffice: "Kaliaboda S.O",
          pinCode: 753003,
        },
        {
          postOffice: "Kalyani Nagar S.O",
          pinCode: 753013,
        },
        {
          postOffice: "Kamaladiha B.O",
          pinCode: 754032,
        },
        {
          postOffice: "Kandarai B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Kandarpur B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Kandarpur B.O",
          pinCode: 754100,
        },
        {
          postOffice: "Kanika Rajbati S.O",
          pinCode: 753008,
        },
        {
          postOffice: "Kankadajodi B.O",
          pinCode: 754035,
        },
        {
          postOffice: "Kanpur S.O",
          pinCode: 754037,
        },
        {
          postOffice: "Kantakai B.O",
          pinCode: 754009,
        },
        {
          postOffice: "Kantapada B.O",
          pinCode: 754002,
        },
        {
          postOffice: "Kapaleswar S.O",
          pinCode: 754071,
        },
        {
          postOffice: "Kapasi B.O",
          pinCode: 754004,
        },
        {
          postOffice: "Karadibandha B.O",
          pinCode: 754031,
        },
        {
          postOffice: "Karanga B.O",
          pinCode: 754004,
        },
        {
          postOffice: "Karanji B.O",
          pinCode: 754022,
        },
        {
          postOffice: "Karikol B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Kasarda S.O",
          pinCode: 754105,
        },
        {
          postOffice: "Kathojodi S.O",
          pinCode: 753002,
        },
        {
          postOffice: "Katikata B.O",
          pinCode: 754209,
        },
        {
          postOffice: "Kazibazar S.O",
          pinCode: 753001,
        },
        {
          postOffice: "Kendupalli B.O",
          pinCode: 754009,
        },
        {
          postOffice: "Kendupatna S.O",
          pinCode: 754203,
        },
        {
          postOffice: "Khalarda B.O",
          pinCode: 753011,
        },
        {
          postOffice: "Khandasahi B.O",
          pinCode: 754207,
        },
        {
          postOffice: "Khandeita B.O",
          pinCode: 753011,
        },
        {
          postOffice: "Khandol B.O",
          pinCode: 754002,
        },
        {
          postOffice: "Khannagar S.O",
          pinCode: 753012,
        },
        {
          postOffice: "Khatbin Sahi B.O",
          pinCode: 753008,
        },
        {
          postOffice: "Khentalo B.O",
          pinCode: 754131,
        },
        {
          postOffice: "Khnutuni B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Khuntakata B.O",
          pinCode: 754031,
        },
        {
          postOffice: "Khuntakata B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Kishorenagar S.O",
          pinCode: 754131,
        },
        {
          postOffice: "Kokalaba B.O",
          pinCode: 754032,
        },
        {
          postOffice: "Kokhadi B.O",
          pinCode: 754027,
        },
        {
          postOffice: "Kood B.O",
          pinCode: 754221,
        },
        {
          postOffice: "Kotasahi S.O",
          pinCode: 754022,
        },
        {
          postOffice: "Kothapatna B.O",
          pinCode: 754001,
        },
        {
          postOffice: "Koyalpada B.O",
          pinCode: 754027,
        },
        {
          postOffice: "Krushnapali Patna B.O",
          pinCode: 754009,
        },
        {
          postOffice: "Krushnaprasad B.O",
          pinCode: 754004,
        },
        {
          postOffice: "Kuanpal S.O",
          pinCode: 754204,
        },
        {
          postOffice: "Kuhunda B.O",
          pinCode: 754204,
        },
        {
          postOffice: "Kukudanga B.O",
          pinCode: 754201,
        },
        {
          postOffice: "Kulailo B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Kulashree B.O",
          pinCode: 754105,
        },
        {
          postOffice: "Kulasukarpara B.O",
          pinCode: 754209,
        },
        {
          postOffice: "Kumarpur B.O",
          pinCode: 754028,
        },
        {
          postOffice: "Kumudajaipur B.O",
          pinCode: 754204,
        },
        {
          postOffice: "Kurujanga B.O",
          pinCode: 754208,
        },
        {
          postOffice: "Kuspangi B.O",
          pinCode: 754007,
        },
        {
          postOffice: "Kusumbi B.O",
          pinCode: 754221,
        },
        {
          postOffice: "Kusunpur B.O",
          pinCode: 754209,
        },
        {
          postOffice: "Kusunpur B.O",
          pinCode: 754207,
        },
        {
          postOffice: "Lalitgiri B.O",
          pinCode: 754205,
        },
        {
          postOffice: "Lekhanpur B.O",
          pinCode: 754201,
        },
        {
          postOffice: "Lemalo S.O",
          pinCode: 754293,
        },
        {
          postOffice: "Madhab B.O",
          pinCode: 754004,
        },
        {
          postOffice: "Madhupatna S.O",
          pinCode: 753010,
        },
        {
          postOffice: "Madhupur B.O",
          pinCode: 754204,
        },
        {
          postOffice: "Madhusudan Nagar S.O (Cuttack)",
          pinCode: 753008,
        },
        {
          postOffice: "Madhyakachha B.O",
          pinCode: 754200,
        },
        {
          postOffice: "Mahajanpur B.O",
          pinCode: 754200,
        },
        {
          postOffice: "Mahakalbasta B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Mahanga S.O",
          pinCode: 754206,
        },
        {
          postOffice: "Mahasingpur B.O",
          pinCode: 754200,
        },
        {
          postOffice: "Mahidharpara B.O",
          pinCode: 754001,
        },
        {
          postOffice: "Mahulia B.O",
          pinCode: 754031,
        },
        {
          postOffice: "Malasasan B.O",
          pinCode: 754201,
        },
        {
          postOffice: "Malgodown S.O",
          pinCode: 753003,
        },
        {
          postOffice: "Mancheswar B.O",
          pinCode: 754027,
        },
        {
          postOffice: "Mangalabag S.O",
          pinCode: 753001,
        },
        {
          postOffice: "Mangarajpur B.O",
          pinCode: 754028,
        },
        {
          postOffice: "Maniabandha B.O",
          pinCode: 754035,
        },
        {
          postOffice: "Manoharpur B.O",
          pinCode: 754202,
        },
        {
          postOffice: "Medical College S.O",
          pinCode: 753007,
        },
        {
          postOffice: "Megha B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Meria Bazar S.O",
          pinCode: 753001,
        },
        {
          postOffice: "Mirzapur B.O",
          pinCode: 754221,
        },
        {
          postOffice: "Mohana B.O",
          pinCode: 754201,
        },
        {
          postOffice: "Mohanpur B.O",
          pinCode: 754201,
        },
        {
          postOffice: "Mouda S.O",
          pinCode: 754290,
        },
        {
          postOffice: "Mugagahira B.O",
          pinCode: 754031,
        },
        {
          postOffice: "Mulabasanta B.O",
          pinCode: 754204,
        },
        {
          postOffice: "Mundali Colony S.O",
          pinCode: 754006,
        },
        {
          postOffice: "Nakhara B.O",
          pinCode: 754021,
        },
        {
          postOffice: "Naraj B.O",
          pinCode: 754006,
        },
        {
          postOffice: "Narasinghpur B.O",
          pinCode: 754207,
        },
        {
          postOffice: "Narasinghpur S.O",
          pinCode: 754032,
        },
        {
          postOffice: "Nargang B.O",
          pinCode: 754008,
        },
        {
          postOffice: "Narpada B.O",
          pinCode: 754025,
        },
        {
          postOffice: "Natakai B.O",
          pinCode: 754207,
        },
        {
          postOffice: "Nayabazar S.O (Cuttack)",
          pinCode: 753004,
        },
        {
          postOffice: "Niali S.O",
          pinCode: 754004,
        },
        {
          postOffice: "Nimasahi B.O",
          pinCode: 754032,
        },
        {
          postOffice: "Nimasahi S.O",
          pinCode: 753001,
        },
        {
          postOffice: "Nimpur B.O",
          pinCode: 754021,
        },
        {
          postOffice: "Nischintakoili S.O",
          pinCode: 754207,
        },
        {
          postOffice: "Noda B.O",
          pinCode: 754105,
        },
        {
          postOffice: "Nuagaon B.O",
          pinCode: 754004,
        },
        {
          postOffice: "Nuagaon B.O",
          pinCode: 754008,
        },
        {
          postOffice: "Nuapalamhat S.O",
          pinCode: 752120,
        },
        {
          postOffice: "Nuapatna B.O",
          pinCode: 754004,
        },
        {
          postOffice: "Nuapatna B.O",
          pinCode: 754032,
        },
        {
          postOffice: "Nuapatna S.O",
          pinCode: 754035,
        },
        {
          postOffice: "Nukhapada B.O",
          pinCode: 754032,
        },
        {
          postOffice: "Nurtang B.O",
          pinCode: 754204,
        },
        {
          postOffice: "O G Press S.O",
          pinCode: 753010,
        },
        {
          postOffice: "O M P B.O",
          pinCode: 753004,
        },
        {
          postOffice: "O S E S.O",
          pinCode: 753007,
        },
        {
          postOffice: "Odasingh B.O",
          pinCode: 754201,
        },
        {
          postOffice: "Olakana B.O",
          pinCode: 754207,
        },
        {
          postOffice: "Oranda B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Orikanta B.O",
          pinCode: 754293,
        },
        {
          postOffice: "Orissa High Court S.O",
          pinCode: 753002,
        },
        {
          postOffice: "Osanga B.O",
          pinCode: 754206,
        },
        {
          postOffice: "Ostapur B.O",
          pinCode: 754207,
        },
        {
          postOffice: "Padamal B.O",
          pinCode: 754037,
        },
        {
          postOffice: "Padanpur B.O",
          pinCode: 754007,
        },
        {
          postOffice: "Padmapur B.O",
          pinCode: 754200,
        },
        {
          postOffice: "Pahanga B.O",
          pinCode: 754004,
        },
        {
          postOffice: "Paikabarabati B.O",
          pinCode: 754032,
        },
        {
          postOffice: "Palei Derakundi B.O",
          pinCode: 754208,
        },
        {
          postOffice: "Palli Sahi B.O",
          pinCode: 754221,
        },
        {
          postOffice: "Panchagaon B.O",
          pinCode: 754030,
        },
        {
          postOffice: "Pandalam B.O",
          pinCode: 754009,
        },
        {
          postOffice: "Paramahansa B.O",
          pinCode: 754100,
        },
        {
          postOffice: "Patapur B.O",
          pinCode: 754008,
        },
        {
          postOffice: "Patapur B.O",
          pinCode: 754200,
        },
        {
          postOffice: "Patapur B.O",
          pinCode: 754202,
        },
        {
          postOffice: "Patasundarpur B.O",
          pinCode: 754018,
        },
        {
          postOffice: "Pathapur B.O",
          pinCode: 754007,
        },
        {
          postOffice: "Pathuripada B.O",
          pinCode: 754008,
        },
        {
          postOffice: "Pattapole S.O",
          pinCode: 753001,
        },
        {
          postOffice: "Pikola B.O",
          pinCode: 754221,
        },
        {
          postOffice: "Pithapara B.O",
          pinCode: 754207,
        },
        {
          postOffice: "Podamarai B.O",
          pinCode: 754206,
        },
        {
          postOffice: "Poincha B.O",
          pinCode: 754009,
        },
        {
          postOffice: "Postal B.O",
          pinCode: 754018,
        },
        {
          postOffice: "Prajatantra S.O",
          pinCode: 753002,
        },
        {
          postOffice: "Puruna Tigiria B.O",
          pinCode: 754030,
        },
        {
          postOffice: "Purunahatsasan B.O",
          pinCode: 754131,
        },
        {
          postOffice: "Radhakishorepur B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Ragadi B.O",
          pinCode: 754008,
        },
        {
          postOffice: "Ragadipada B.O",
          pinCode: 754031,
        },
        {
          postOffice: "Raghunathpur B.O",
          pinCode: 754005,
        },
        {
          postOffice: "Rahania B.O",
          pinCode: 754204,
        },
        {
          postOffice: "Raipur Cuttack B.O",
          pinCode: 754001,
        },
        {
          postOffice: "Rajabagicha S.O",
          pinCode: 753009,
        },
        {
          postOffice: "Rajendra Nagar S.O (Cuttack)",
          pinCode: 753010,
        },
        {
          postOffice: "Rajib B.O",
          pinCode: 754009,
        },
        {
          postOffice: "Ramakrishnapur B.O",
          pinCode: 754201,
        },
        {
          postOffice: "Rameswar S.O",
          pinCode: 754201,
        },
        {
          postOffice: "Ramgarh B.O",
          pinCode: 754022,
        },
        {
          postOffice: "Ratapat B.O",
          pinCode: 754037,
        },
        {
          postOffice: "Ravenshaw College S.O",
          pinCode: 753003,
        },
        {
          postOffice: "Regeda B.O",
          pinCode: 754032,
        },
        {
          postOffice: "Rusipada B.O",
          pinCode: 754037,
        },
        {
          postOffice: "Sabalanga Kanipara B.O",
          pinCode: 754208,
        },
        {
          postOffice: "Sadar Harianta B.O",
          pinCode: 754003,
        },
        {
          postOffice: "Safa B.O",
          pinCode: 754022,
        },
        {
          postOffice: "Sagar B.O",
          pinCode: 754037,
        },
        {
          postOffice: "Sahangagopalpur B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Sahaniajpur B.O",
          pinCode: 754207,
        },
        {
          postOffice: "Sailo Badbail B.O",
          pinCode: 754018,
        },
        {
          postOffice: "Sailo Jharpada B.O",
          pinCode: 754003,
        },
        {
          postOffice: "Salagaon B.O",
          pinCode: 754021,
        },
        {
          postOffice: "Salipur College S.O",
          pinCode: 754202,
        },
        {
          postOffice: "Salipur S.O",
          pinCode: 754202,
        },
        {
          postOffice: "Samitanga B.O",
          pinCode: 754131,
        },
        {
          postOffice: "Samsarpur B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Sankarpur B.O",
          pinCode: 754028,
        },
        {
          postOffice: "Sankhameri B.O",
          pinCode: 754031,
        },
        {
          postOffice: "Sankhatras B.O",
          pinCode: 753011,
        },
        {
          postOffice: "Saradhapur B.O",
          pinCode: 754032,
        },
        {
          postOffice: "Sarichuan B.O",
          pinCode: 754112,
        },
        {
          postOffice: "Sasang B.O",
          pinCode: 754031,
        },
        {
          postOffice: "Satyabhamapur B.O",
          pinCode: 754200,
        },
        {
          postOffice: "Sector ll CDA Cuttack S.O",
          pinCode: 753015,
        },
        {
          postOffice: "Shelter Chhak S.O",
          pinCode: 753008,
        },
        {
          postOffice: "Sialia B.O",
          pinCode: 754037,
        },
        {
          postOffice: "Sidheswarpur B.O",
          pinCode: 754100,
        },
        {
          postOffice: "Sikharpur S.O",
          pinCode: 753003,
        },
        {
          postOffice: "Singhanathpitha B.O",
          pinCode: 754031,
        },
        {
          postOffice: "Sisua B.O",
          pinCode: 754202,
        },
        {
          postOffice: "Sompur S.O",
          pinCode: 754130,
        },
        {
          postOffice: "Sri Aurobinda Marg S.O",
          pinCode: 753013,
        },
        {
          postOffice: "Subarnapur B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Sukarapara B.O",
          pinCode: 754209,
        },
        {
          postOffice: "Sukleswar B.O",
          pinCode: 754221,
        },
        {
          postOffice: "Sunakhandi B.O",
          pinCode: 754202,
        },
        {
          postOffice: "Sundargram S.O",
          pinCode: 754002,
        },
        {
          postOffice: "Sungura S.O (Cuttack)",
          pinCode: 754221,
        },
        {
          postOffice: "Swaraj Ashram S.O",
          pinCode: 753002,
        },
        {
          postOffice: "Talabasta B.O",
          pinCode: 754007,
        },
        {
          postOffice: "Taradinga B.O",
          pinCode: 754029,
        },
        {
          postOffice: "Tarat Sasan B.O",
          pinCode: 754209,
        },
        {
          postOffice: "Tarito B.O",
          pinCode: 754131,
        },
        {
          postOffice: "Telenga Bazar S.O",
          pinCode: 753009,
        },
        {
          postOffice: "Telengapentha B.O",
          pinCode: 754001,
        },
        {
          postOffice: "Tentol B.O",
          pinCode: 754200,
        },
        {
          postOffice: "Tigiria S.O",
          pinCode: 754030,
        },
        {
          postOffice: "Tilda B.O",
          pinCode: 754290,
        },
        {
          postOffice: "Totapada B.O",
          pinCode: 754131,
        },
        {
          postOffice: "Tulasipur S.O",
          pinCode: 753008,
        },
        {
          postOffice: "Uaradha B.O",
          pinCode: 754010,
        },
        {
          postOffice: "Uchapada B.O",
          pinCode: 754022,
        },
        {
          postOffice: "Urali B.O",
          pinCode: 753011,
        },
        {
          postOffice: "Uttampur B.O",
          pinCode: 753011,
        },
        {
          postOffice: "Uttaran B.O",
          pinCode: 754105,
        },
        {
          postOffice: "Uttarkul B.O",
          pinCode: 754134,
        },
        {
          postOffice: "Viruda B.O",
          pinCode: 754030,
        },
      ],
      Deogarh: [
        {
          postOffice: "Adas PSSK B.O",
          pinCode: 768109,
        },
        {
          postOffice: "Aunli B.O",
          pinCode: 768109,
        },
        {
          postOffice: "Badchhapal PSSK B.O",
          pinCode: 768108,
        },
        {
          postOffice: "Balam B.O",
          pinCode: 768108,
        },
        {
          postOffice: "Balanda B.O",
          pinCode: 768110,
        },
        {
          postOffice: "Balani B.O",
          pinCode: 768110,
        },
        {
          postOffice: "Bamparda B.O",
          pinCode: 768110,
        },
        {
          postOffice: "Baniakilinda PSSK B.O",
          pinCode: 768108,
        },
        {
          postOffice: "Barghat B.O",
          pinCode: 768121,
        },
        {
          postOffice: "Barkote S.O",
          pinCode: 768110,
        },
        {
          postOffice: "Basaloi B.O",
          pinCode: 768108,
        },
        {
          postOffice: "Bhatsingh B.O",
          pinCode: 768108,
        },
        {
          postOffice: "Bijayanagar PSSK B.O",
          pinCode: 768110,
        },
        {
          postOffice: "Budido B.O",
          pinCode: 768109,
        },
        {
          postOffice: "Charimancha B.O",
          pinCode: 768110,
        },
        {
          postOffice: "Dandasingha B.O",
          pinCode: 768108,
        },
        {
          postOffice: "Danra B.O",
          pinCode: 768110,
        },
        {
          postOffice: "Dantaribahal B.O",
          pinCode: 768108,
        },
        {
          postOffice: "Dashgharia B.O",
          pinCode: 768109,
        },
        {
          postOffice: "Deogarh S.O (Debagarh)",
          pinCode: 768108,
        },
        {
          postOffice: "Dholpara B.O",
          pinCode: 768121,
        },
        {
          postOffice: "Gambharipali B.O",
          pinCode: 768109,
        },
        {
          postOffice: "Ganganan B.O",
          pinCode: 768108,
        },
        {
          postOffice: "Gohira Dam Site S.O",
          pinCode: 768121,
        },
        {
          postOffice: "Gundiapali PSSK B.O",
          pinCode: 768119,
        },
        {
          postOffice: "Gursang B.O",
          pinCode: 768110,
        },
        {
          postOffice: "Jhargogua B.O",
          pinCode: 768108,
        },
        {
          postOffice: "K.Tainsar B.O",
          pinCode: 768119,
        },
        {
          postOffice: "Kadopada B.O",
          pinCode: 768110,
        },
        {
          postOffice: "Kalla B.O",
          pinCode: 768110,
        },
        {
          postOffice: "Kandhal B.O",
          pinCode: 768108,
        },
        {
          postOffice: "Kansar B.O",
          pinCode: 768121,
        },
        {
          postOffice: "Kantabahal B.O",
          pinCode: 768109,
        },
        {
          postOffice: "Kantapali B.O",
          pinCode: 768108,
        },
        {
          postOffice: "Karlaga B.O",
          pinCode: 768109,
        },
        {
          postOffice: "Katangapani B.O",
          pinCode: 768107,
        },
        {
          postOffice: "Khilei B.O",
          pinCode: 768108,
        },
        {
          postOffice: "Kuliapal PSSK B.O",
          pinCode: 768110,
        },
        {
          postOffice: "Kundheigola B.O",
          pinCode: 768109,
        },
        {
          postOffice: "Laimura B.O",
          pinCode: 768108,
        },
        {
          postOffice: "Lulang B.O",
          pinCode: 768109,
        },
        {
          postOffice: "Madhyapur B.O",
          pinCode: 768110,
        },
        {
          postOffice: "Malehipada B.O",
          pinCode: 768109,
        },
        {
          postOffice: "Naulipara B.O",
          pinCode: 768109,
        },
        {
          postOffice: "Nuadihi B.O",
          pinCode: 768228,
        },
        {
          postOffice: "Nuadihi B.O",
          pinCode: 768108,
        },
        {
          postOffice: "Palsama B.O",
          pinCode: 768109,
        },
        {
          postOffice: "Parposi B.O",
          pinCode: 768108,
        },
        {
          postOffice: "Purunagarh S.O",
          pinCode: 768119,
        },
        {
          postOffice: "Raitabahal PSSK B.O",
          pinCode: 768110,
        },
        {
          postOffice: "Rambhai PSSK B.O",
          pinCode: 768108,
        },
        {
          postOffice: "Reamal S.O",
          pinCode: 768109,
        },
        {
          postOffice: "Rengalbeda B.O",
          pinCode: 768119,
        },
        {
          postOffice: "Saida B.O",
          pinCode: 768110,
        },
        {
          postOffice: "Salebhata B.O",
          pinCode: 768109,
        },
        {
          postOffice: "Sarpal B.O",
          pinCode: 768109,
        },
        {
          postOffice: "Saruali B.O",
          pinCode: 768110,
        },
        {
          postOffice: "Suguda B.O",
          pinCode: 768108,
        },
        {
          postOffice: "Tabada B.O",
          pinCode: 768119,
        },
        {
          postOffice: "Tarang B.O",
          pinCode: 768109,
        },
        {
          postOffice: "Tentelabahal B.O",
          pinCode: 768119,
        },
        {
          postOffice: "Tileibani B.O",
          pinCode: 768119,
        },
        {
          postOffice: "Tinkbir B.O",
          pinCode: 768109,
        },
        {
          postOffice: "Tuhilamal B.O",
          pinCode: 768109,
        },
        {
          postOffice: "Tungamal B.O",
          pinCode: 768109,
        },
        {
          postOffice: "Utunia B.O",
          pinCode: 768109,
        },
      ],
      Dhenkanal: [
        {
          postOffice: "Akhuapal B.O",
          pinCode: 759146,
        },
        {
          postOffice: "Anantapur B.O",
          pinCode: 759017,
        },
        {
          postOffice: "Anlabereni S.O",
          pinCode: 759026,
        },
        {
          postOffice: "Anlajhari B.O",
          pinCode: 759017,
        },
        {
          postOffice: "Babandha B.O",
          pinCode: 759019,
        },
        {
          postOffice: "Badajhara B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Badakamar B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Badalo B.O",
          pinCode: 759020,
        },
        {
          postOffice: "Badanagena B.O",
          pinCode: 759014,
        },
        {
          postOffice: "Badasuanlo S.O",
          pinCode: 759039,
        },
        {
          postOffice: "Bainsia B.O",
          pinCode: 759014,
        },
        {
          postOffice: "Baisingha B.O",
          pinCode: 759039,
        },
        {
          postOffice: "Bajichowk B.O",
          pinCode: 759013,
        },
        {
          postOffice: "Baladiabandha B.O",
          pinCode: 759027,
        },
        {
          postOffice: "Balaramprasad B.O",
          pinCode: 759019,
        },
        {
          postOffice: "Balarampur B.O",
          pinCode: 759025,
        },
        {
          postOffice: "Balibo B.O",
          pinCode: 759017,
        },
        {
          postOffice: "Baligoroda B.O",
          pinCode: 759039,
        },
        {
          postOffice: "Balimi S.O",
          pinCode: 759020,
        },
        {
          postOffice: "Bam B.O",
          pinCode: 759028,
        },
        {
          postOffice: "Bampa B.O",
          pinCode: 759025,
        },
        {
          postOffice: "Bamuan B.O",
          pinCode: 759026,
        },
        {
          postOffice: "Banasingh B.O",
          pinCode: 759014,
        },
        {
          postOffice: "Bangursinga B.O",
          pinCode: 759019,
        },
        {
          postOffice: "Bankual B.O",
          pinCode: 759023,
        },
        {
          postOffice: "Barada B.O",
          pinCode: 759016,
        },
        {
          postOffice: "Barada B.O",
          pinCode: 759013,
        },
        {
          postOffice: "Barihapur B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Baruan B.O",
          pinCode: 759024,
        },
        {
          postOffice: "Basoi B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Batagaon B.O",
          pinCode: 759018,
        },
        {
          postOffice: "Baulpur B.O",
          pinCode: 759025,
        },
        {
          postOffice: "Baunsapal B.O",
          pinCode: 759018,
        },
        {
          postOffice: "Baunsapokhari B.O",
          pinCode: 759022,
        },
        {
          postOffice: "Bedapada B.O",
          pinCode: 759019,
        },
        {
          postOffice: "Belapada B.O",
          pinCode: 759025,
        },
        {
          postOffice: "Belatikiri B.O",
          pinCode: 759027,
        },
        {
          postOffice: "Beruanpal B.O",
          pinCode: 759121,
        },
        {
          postOffice: "Bhagirathipur B.O",
          pinCode: 759018,
        },
        {
          postOffice: "Bhairpur B.O",
          pinCode: 759023,
        },
        {
          postOffice: "Bhaliabolkateni B.O",
          pinCode: 759015,
        },
        {
          postOffice: "Bhapur S.O (Dhenkanal)",
          pinCode: 759015,
        },
        {
          postOffice: "Bhejia B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Bhuban S.O",
          pinCode: 759017,
        },
        {
          postOffice: "Bhusal B.O",
          pinCode: 759017,
        },
        {
          postOffice: "Bidharpur B.O",
          pinCode: 759016,
        },
        {
          postOffice: "Bido B.O",
          pinCode: 759121,
        },
        {
          postOffice: "Birasal B.O",
          pinCode: 759039,
        },
        {
          postOffice: "Biribolei B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Brahmaniapal B.O",
          pinCode: 759025,
        },
        {
          postOffice: "Buhalipal B.O",
          pinCode: 759021,
        },
        {
          postOffice: "Chandapur B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Chandipal B.O",
          pinCode: 759017,
        },
        {
          postOffice: "Chandpur B.O",
          pinCode: 759019,
        },
        {
          postOffice: "Chandrasekharaprasad B.O",
          pinCode: 759015,
        },
        {
          postOffice: "Chaulia B.O",
          pinCode: 759013,
        },
        {
          postOffice: "Chhotapada B.O",
          pinCode: 759021,
        },
        {
          postOffice: "Chintapokhari B.O",
          pinCode: 759121,
        },
        {
          postOffice: "Chirulei B.O",
          pinCode: 759014,
        },
        {
          postOffice: "Chitalpur B.O",
          pinCode: 759020,
        },
        {
          postOffice: "Damal B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Dashipur B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Dhalapada B.O",
          pinCode: 759017,
        },
        {
          postOffice: "Dhalapur B.O",
          pinCode: 759019,
        },
        {
          postOffice: "Dhalpur B.O",
          pinCode: 759019,
        },
        {
          postOffice: "Dhenkanal College S.O",
          pinCode: 759001,
        },
        {
          postOffice: "Dhenkanal H.O",
          pinCode: 759001,
        },
        {
          postOffice: "Dhenkanal R S S.O",
          pinCode: 759013,
        },
        {
          postOffice: "Dhirapatna B.O",
          pinCode: 759015,
        },
        {
          postOffice: "Dighi B.O",
          pinCode: 759023,
        },
        {
          postOffice: "Dudurkote B.O",
          pinCode: 759020,
        },
        {
          postOffice: "Ekatali B.O",
          pinCode: 759017,
        },
        {
          postOffice: "Gadasila S.O",
          pinCode: 759025,
        },
        {
          postOffice: "Gahamkhunti B.O",
          pinCode: 759027,
        },
        {
          postOffice: "Gandanali B.O",
          pinCode: 759021,
        },
        {
          postOffice: "Gangijodi B.O",
          pinCode: 759026,
        },
        {
          postOffice: "Garh Nrusinghaprasad B.O",
          pinCode: 759024,
        },
        {
          postOffice: "Garh Palasuni B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Gengutia B.O",
          pinCode: 759013,
        },
        {
          postOffice: "Gengutia B.O",
          pinCode: 759146,
        },
        {
          postOffice: "Ghagarmunda B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Ghatipiri B.O",
          pinCode: 759015,
        },
        {
          postOffice: "Giridharaprasad B.O",
          pinCode: 759020,
        },
        {
          postOffice: "Gobinda Bidyadharpur B.O",
          pinCode: 759023,
        },
        {
          postOffice: "Gondiapatna S.O",
          pinCode: 759016,
        },
        {
          postOffice: "Gorodia B.O",
          pinCode: 759023,
        },
        {
          postOffice: "Govindprasad B.O",
          pinCode: 759015,
        },
        {
          postOffice: "Govindpur S.O (Dhenkanal)",
          pinCode: 759027,
        },
        {
          postOffice: "Gunadei B.O",
          pinCode: 759025,
        },
        {
          postOffice: "Gundichapada B.O",
          pinCode: 759025,
        },
        {
          postOffice: "Guneibil B.O",
          pinCode: 759023,
        },
        {
          postOffice: "Haladiabahal B.O",
          pinCode: 759121,
        },
        {
          postOffice: "Hatura B.O",
          pinCode: 759020,
        },
        {
          postOffice: "Hindol Road R.S. S.O",
          pinCode: 759019,
        },
        {
          postOffice: "Hindol S.O",
          pinCode: 759022,
        },
        {
          postOffice: "Ichhabatipur B.O",
          pinCode: 759026,
        },
        {
          postOffice: "Igit Sarang S.O",
          pinCode: 759146,
        },
        {
          postOffice: "Indipur B.O",
          pinCode: 759025,
        },
        {
          postOffice: "Jagannathpur B.O",
          pinCode: 759039,
        },
        {
          postOffice: "Jamunakote B.O",
          pinCode: 759024,
        },
        {
          postOffice: "Jayapurakateni B.O",
          pinCode: 759018,
        },
        {
          postOffice: "Jhili B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Jineilo B.O",
          pinCode: 759023,
        },
        {
          postOffice: "Jiral B.O",
          pinCode: 759023,
        },
        {
          postOffice: "Jubuli Town S.O",
          pinCode: 759001,
        },
        {
          postOffice: "Kabera Madhapur B.O",
          pinCode: 759014,
        },
        {
          postOffice: "Kadala B.O",
          pinCode: 759121,
        },
        {
          postOffice: "Kaimati B.O",
          pinCode: 759027,
        },
        {
          postOffice: "Kakudibhag B.O",
          pinCode: 759015,
        },
        {
          postOffice: "Kalanda B.O",
          pinCode: 759020,
        },
        {
          postOffice: "Kalanga B.O",
          pinCode: 759015,
        },
        {
          postOffice: "Kalikaprasad B.O",
          pinCode: 759015,
        },
        {
          postOffice: "Kalingapal B.O",
          pinCode: 759021,
        },
        {
          postOffice: "Kalunigoda B.O",
          pinCode: 759016,
        },
        {
          postOffice: "Kaluria B.O",
          pinCode: 759014,
        },
        {
          postOffice: "Kamadhenukote B.O",
          pinCode: 759015,
        },
        {
          postOffice: "Kamakhyanagar S.O",
          pinCode: 759018,
        },
        {
          postOffice: "Kamalanga B.O",
          pinCode: 759121,
        },
        {
          postOffice: "Kamarda B.O",
          pinCode: 759018,
        },
        {
          postOffice: "Kanapura B.O",
          pinCode: 759018,
        },
        {
          postOffice: "Kandabindha B.O",
          pinCode: 759025,
        },
        {
          postOffice: "Kandarsinga B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Kandhara B.O",
          pinCode: 759028,
        },
        {
          postOffice: "Kanheipal B.O",
          pinCode: 759039,
        },
        {
          postOffice: "Kankadahad S.O",
          pinCode: 759028,
        },
        {
          postOffice: "Kankadahad Sadar B.O",
          pinCode: 759015,
        },
        {
          postOffice: "Kankadasoda B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Kankadpal B.O",
          pinCode: 759013,
        },
        {
          postOffice: "Kankalu B.O",
          pinCode: 759121,
        },
        {
          postOffice: "Kankili B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Kansara B.O",
          pinCode: 759022,
        },
        {
          postOffice: "Kantapal B.O",
          pinCode: 759026,
        },
        {
          postOffice: "Kantapal B.O",
          pinCode: 759028,
        },
        {
          postOffice: "Kantimili B.O",
          pinCode: 759121,
        },
        {
          postOffice: "Kantiokateni B.O",
          pinCode: 759026,
        },
        {
          postOffice: "Kantioputasahi B.O",
          pinCode: 759026,
        },
        {
          postOffice: "Kantol B.O",
          pinCode: 759028,
        },
        {
          postOffice: "Kantor B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Kapilash B.O",
          pinCode: 759016,
        },
        {
          postOffice: "Karagola B.O",
          pinCode: 759028,
        },
        {
          postOffice: "Karamul B.O",
          pinCode: 759014,
        },
        {
          postOffice: "Karanda B.O",
          pinCode: 759020,
        },
        {
          postOffice: "Kashipur B.O",
          pinCode: 759016,
        },
        {
          postOffice: "Kasiadihi B.O",
          pinCode: 759025,
        },
        {
          postOffice: "Kendupada B.O",
          pinCode: 759014,
        },
        {
          postOffice: "Kerjoli B.O",
          pinCode: 759028,
        },
        {
          postOffice: "Khajuria B.O",
          pinCode: 759018,
        },
        {
          postOffice: "Khaliborei B.O",
          pinCode: 759021,
        },
        {
          postOffice: "Khankar B.O",
          pinCode: 759014,
        },
        {
          postOffice: "Khankira B.O",
          pinCode: 759016,
        },
        {
          postOffice: "Kharagprasad B.O",
          pinCode: 759121,
        },
        {
          postOffice: "Khatakhura B.O",
          pinCode: 759039,
        },
        {
          postOffice: "Khurusia B.O",
          pinCode: 759023,
        },
        {
          postOffice: "Korian B.O",
          pinCode: 759013,
        },
        {
          postOffice: "Kotagara B.O",
          pinCode: 759026,
        },
        {
          postOffice: "Kottam B.O",
          pinCode: 759015,
        },
        {
          postOffice: "Krishnachandrapur B.O",
          pinCode: 759020,
        },
        {
          postOffice: "Kuanlo B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Kumusi B.O",
          pinCode: 759019,
        },
        {
          postOffice: "Kunua B.O",
          pinCode: 759021,
        },
        {
          postOffice: "Kusumjodi B.O",
          pinCode: 759026,
        },
        {
          postOffice: "Kusupanga B.O",
          pinCode: 759121,
        },
        {
          postOffice: "Kuturia B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Lauloi B.O",
          pinCode: 759016,
        },
        {
          postOffice: "Letheka B.O",
          pinCode: 759016,
        },
        {
          postOffice: "Lodhani B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Mahabirod B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Mahapada B.O",
          pinCode: 759014,
        },
        {
          postOffice: "Mahimagadi S.O",
          pinCode: 759014,
        },
        {
          postOffice: "Mahisapat B.O",
          pinCode: 759013,
        },
        {
          postOffice: "Mahulapada B.O",
          pinCode: 759027,
        },
        {
          postOffice: "Mahulapal B.O",
          pinCode: 759017,
        },
        {
          postOffice: "Mahulpal B.O",
          pinCode: 759018,
        },
        {
          postOffice: "Maidharpur B.O",
          pinCode: 759022,
        },
        {
          postOffice: "Makuakateni B.O",
          pinCode: 759039,
        },
        {
          postOffice: "Malapura B.O",
          pinCode: 759018,
        },
        {
          postOffice: "Mandar B.O",
          pinCode: 759016,
        },
        {
          postOffice: "Mangalpur B.O",
          pinCode: 759015,
        },
        {
          postOffice: "Manikmara B.O",
          pinCode: 759146,
        },
        {
          postOffice: "Manipur B.O",
          pinCode: 759027,
        },
        {
          postOffice: "Marthapur S.O",
          pinCode: 759023,
        },
        {
          postOffice: "Maruabil B.O",
          pinCode: 759039,
        },
        {
          postOffice: "Mathakargola S.O",
          pinCode: 759024,
        },
        {
          postOffice: "Mathatentulia B.O",
          pinCode: 759016,
        },
        {
          postOffice: "Meramandali S.O",
          pinCode: 759121,
        },
        {
          postOffice: "Motta B.O",
          pinCode: 759018,
        },
        {
          postOffice: "Muktapasi B.O",
          pinCode: 759018,
        },
        {
          postOffice: "Mundeilo B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Nadhara B.O",
          pinCode: 759019,
        },
        {
          postOffice: "Nadiali B.O",
          pinCode: 759027,
        },
        {
          postOffice: "Neulpoi B.O",
          pinCode: 759014,
        },
        {
          postOffice: "Nihalprasad B.O",
          pinCode: 759016,
        },
        {
          postOffice: "Nimabahali B.O",
          pinCode: 759121,
        },
        {
          postOffice: "Nuabag B.O",
          pinCode: 759021,
        },
        {
          postOffice: "Nuagarh B.O",
          pinCode: 759016,
        },
        {
          postOffice: "Odisha B.O",
          pinCode: 759024,
        },
        {
          postOffice: "Paikapurunakote B.O",
          pinCode: 759121,
        },
        {
          postOffice: "Panchapada B.O",
          pinCode: 759020,
        },
        {
          postOffice: "Pangatira B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Parjang S.O",
          pinCode: 759120,
        },
        {
          postOffice: "Patala B.O",
          pinCode: 759121,
        },
        {
          postOffice: "Patamandir B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Phulapada B.O",
          pinCode: 759022,
        },
        {
          postOffice: "Pingua B.O",
          pinCode: 759016,
        },
        {
          postOffice: "Pipala B.O",
          pinCode: 759018,
        },
        {
          postOffice: "Radhadeipur B.O",
          pinCode: 759014,
        },
        {
          postOffice: "Raibol B.O",
          pinCode: 759039,
        },
        {
          postOffice: "Rainrusinghpur B.O",
          pinCode: 759026,
        },
        {
          postOffice: "Raitala B.O",
          pinCode: 759016,
        },
        {
          postOffice: "Ramakrishnapur B.O",
          pinCode: 759017,
        },
        {
          postOffice: "Ranjagol B.O",
          pinCode: 759020,
        },
        {
          postOffice: "Rasol S.O",
          pinCode: 759021,
        },
        {
          postOffice: "Rendapatana B.O",
          pinCode: 759017,
        },
        {
          postOffice: "Roda B.O",
          pinCode: 759120,
        },
        {
          postOffice: "Saanda B.O",
          pinCode: 759019,
        },
        {
          postOffice: "Sadangi B.O",
          pinCode: 759016,
        },
        {
          postOffice: "Sadasivapur B.O",
          pinCode: 759025,
        },
        {
          postOffice: "Samatangi B.O",
          pinCode: 759018,
        },
        {
          postOffice: "Sanjapada B.O",
          pinCode: 759128,
        },
        {
          postOffice: "Santhapur B.O",
          pinCode: 759016,
        },
        {
          postOffice: "Saptasajya B.O",
          pinCode: 759013,
        },
        {
          postOffice: "arakpatana B.O",
          pinCode: 759015,
        },
        {
          postOffice: "Saranga B.O",
          pinCode: 759146,
        },
        {
          postOffice: "Saruali B.O",
          pinCode: 759018,
        },
        {
          postOffice: "Shankarpur B.O",
          pinCode: 759013,
        },
        {
          postOffice: "Sibapur B.O",
          pinCode: 759121,
        },
        {
          postOffice: "Sibulapasi B.O",
          pinCode: 759018,
        },
        {
          postOffice: "Siminai B.O",
          pinCode: 759025,
        },
        {
          postOffice: "Sogar B.O",
          pinCode: 759026,
        },
        {
          postOffice: "Sorisiapada B.O",
          pinCode: 759016,
        },
        {
          postOffice: "Surapratapapur B.O",
          pinCode: 759024,
        },
        {
          postOffice: "Talabarkote B.O",
          pinCode: 759027,
        },
        {
          postOffice: "Tarava B.O",
          pinCode: 759013,
        },
        {
          postOffice: "Tariniposi B.O",
          pinCode: 759028,
        },
        {
          postOffice: "Thokar B.O",
          pinCode: 759020,
        },
        {
          postOffice: "Tumusinga B.O",
          pinCode: 759026,
        },
      ],
      Gajapati: [
        {
          postOffice: "Adhagam B.O",
          pinCode: 761215,
        },
        {
          postOffice: "Agarkhandi B.O",
          pinCode: 761211,
        },
        {
          postOffice: "Ajayagada B.O",
          pinCode: 761207,
        },
        {
          postOffice: "Anguru B.O",
          pinCode: 761016,
        },
        {
          postOffice: "Ariba B.O",
          pinCode: 761211,
        },
        {
          postOffice: "Ashrayagada B.O",
          pinCode: 761207,
        },
        {
          postOffice: "Attarsingi B.O",
          pinCode: 761016,
        },
        {
          postOffice: "B.Sitapur B.O",
          pinCode: 761201,
        },
        {
          postOffice: "Badakhani B.O",
          pinCode: 761015,
        },
        {
          postOffice: "Badakolkote B.O",
          pinCode: 761207,
        },
        {
          postOffice: "Badapada B.O",
          pinCode: 761214,
        },
        {
          postOffice: "Badasindhiba B.O",
          pinCode: 761017,
        },
        {
          postOffice: "Badigam B.O",
          pinCode: 761206,
        },
        {
          postOffice: "Bagusola B.O",
          pinCode: 761211,
        },
        {
          postOffice: "Baijhola B.O",
          pinCode: 761206,
        },
        {
          postOffice: "Bapenbadi B.O",
          pinCode: 761208,
        },
        {
          postOffice: "Batisiripur B.O",
          pinCode: 761211,
        },
        {
          postOffice: "Betarsingi B.O",
          pinCode: 761016,
        },
        {
          postOffice: "Bhupati Laxmipur B.O",
          pinCode: 761206,
        },
        {
          postOffice: "Bhuskudi B.O",
          pinCode: 761210,
        },
        {
          postOffice: "Birikote B.O",
          pinCode: 761217,
        },
        {
          postOffice: "Birujango B.O",
          pinCode: 761213,
        },
        {
          postOffice: "Bomika B.O",
          pinCode: 761211,
        },
        {
          postOffice: "Chandiput B.O",
          pinCode: 761017,
        },
        {
          postOffice: "Chandragiri S.O",
          pinCode: 761017,
        },
        {
          postOffice: "Chellagada B.O",
          pinCode: 761016,
        },
        {
          postOffice: "Chelligada B.O",
          pinCode: 761017,
        },
        {
          postOffice: "Chitrakar Street S.O",
          pinCode: 761200,
        },
        {
          postOffice: "Damadua B.O",
          pinCode: 761217,
        },
        {
          postOffice: "Dambala B.O",
          pinCode: 761212,
        },
        {
          postOffice: "Darba B.O",
          pinCode: 761017,
        },
        {
          postOffice: "Devadala B.O",
          pinCode: 761208,
        },
        {
          postOffice: "Dhadhiambo B.O",
          pinCode: 761017,
        },
        {
          postOffice: "Engarsingi B.O",
          pinCode: 761212,
        },
        {
          postOffice: "Gaiba B.O",
          pinCode: 761208,
        },
        {
          postOffice: "Gangabad B.O",
          pinCode: 761212,
        },
        {
          postOffice: "Garabandha S.O",
          pinCode: 761215,
        },
        {
          postOffice: "Gayaljuba B.O",
          pinCode: 761212,
        },
        {
          postOffice: "Gondahati B.O",
          pinCode: 761215,
        },
        {
          postOffice: "Goppilli Rampa B.O",
          pinCode: 761215,
        },
        {
          postOffice: "Goribandha B.O",
          pinCode: 761206,
        },
        {
          postOffice: "Gosani B.O",
          pinCode: 761210,
        },
        {
          postOffice: "Gulli B.O",
          pinCode: 761214,
        },
        {
          postOffice: "Guluba B.O",
          pinCode: 61217,
        },
        {
          postOffice: "Gumma S.O (Gajapati)",
          pinCode: 761207,
        },
        {
          postOffice: "Gurandi S.O",
          pinCode: 761210,
        },
        {
          postOffice: "Hadubhangi B.O",
          pinCode: 761208,
        },
        {
          postOffice: "Hospital Road S.O (Gajapati)",
          pinCode: 761200,
        },
        {
          postOffice: "Jallango B.O",
          pinCode: 761213,
        },
        {
          postOffice: "Jammi B.O",
          pinCode: 761201,
        },
        {
          postOffice: "Jangalpadu B.O",
          pinCode: 761210,
        },
        {
          postOffice: "Jangam Street S.O",
          pinCode: 761201,
        },
        {
          postOffice: "Jeeba B.O",
          pinCode: 761201,
        },
        {
          postOffice: "Jeerango B.O",
          pinCode: 761212,
        },
        {
          postOffice: "Jeerango Colony B.O",
          pinCode: 761017,
        },
        {
          postOffice: "Jhalarasingi B.O",
          pinCode: 761214,
        },
        {
          postOffice: "Jogipadu B.O",
          pinCode: 761201,
        },
        {
          postOffice: "K.Sitapur B.O",
          pinCode: 761208,
        },
        {
          postOffice: "Kakasingi B.O",
          pinCode: 761016,
        },
        {
          postOffice: "Karadasingi B.O",
          pinCode: 761213,
        },
        {
          postOffice: "Karasandha B.O",
          pinCode: 761211,
        },
        {
          postOffice: "Karchabadi B.O",
          pinCode: 761217,
        },
        {
          postOffice: "Kashinagar S.O (Gajapati)",
          pinCode: 761206,
        },
        {
          postOffice: "Keradango B.O",
          pinCode: 761214,
        },
        {
          postOffice: "Kerandi B.O",
          pinCode: 761201,
        },
        {
          postOffice: "Khajuripada B.O",
          pinCode: 761214,
        },
        {
          postOffice: "Khandava B.O",
          pinCode: 761206,
        },
        {
          postOffice: "Kharada S.O",
          pinCode: 761208,
        },
        {
          postOffice: "Kinchilingi B.O",
          pinCode: 761215,
        },
        {
          postOffice: "Kinigam B.O",
          pinCode: 761018,
        },
        {
          postOffice: "Kinigam B.O",
          pinCode: 761206,
        },
        {
          postOffice: "Kitingi B.O",
          pinCode: 761206,
        },
        {
          postOffice: "Koinpur B.O",
          pinCode: 761212,
        },
        {
          postOffice: "Kolia B.O",
          pinCode: 761206,
        },
        {
          postOffice: "Krishnachandrapur B.O",
          pinCode: 761207,
        },
        {
          postOffice: "Kujasingi B.O",
          pinCode: 761213,
        },
        {
          postOffice: "Kumulusingi B.O",
          pinCode: 761213,
        },
        {
          postOffice: "Kuruguba B.O",
          pinCode: 761212,
        },
        {
          postOffice: "Labanyagada B.O",
          pinCode: 761215,
        },
        {
          postOffice: "Laduru B.O",
          pinCode: 761015,
        },
        {
          postOffice: "Lalusahi B.O",
          pinCode: 761212,
        },
        {
          postOffice: "Laxmipur B.O",
          pinCode: 761212,
        },
        {
          postOffice: "Liligada B.O",
          pinCode: 761015,
        },
        {
          postOffice: "Loba B.O",
          pinCode: 761016,
        },
        {
          postOffice: "Luhagudi B.O",
          pinCode: 761015,
        },
        {
          postOffice: "Madhusudanpur B.O",
          pinCode: 761211,
        },
        {
          postOffice: "Mahendragada B.O",
          pinCode: 761017,
        },
        {
          postOffice: "Malasapadar B.O",
          pinCode: 761015,
        },
        {
          postOffice: "Mandimera B.O",
          pinCode: 761217,
        },
        {
          postOffice: "Mangarajpur B.O",
          pinCode: 761016,
        },
        {
          postOffice: "Marlaba B.O",
          pinCode: 761213,
        },
        {
          postOffice: "Mochamera B.O",
          pinCode: 761211,
        },
        {
          postOffice: "Mohana S.O",
          pinCode: 761015,
        },
        {
          postOffice: "Mudumudia B.O",
          pinCode: 761015,
        },
        {
          postOffice: "Munisingi B.O",
          pinCode: 761207,
        },
        {
          postOffice: "Nalaghat B.O",
          pinCode: 761217,
        },
        {
          postOffice: "Namagari B.O",
          pinCode: 761211,
        },
        {
          postOffice: "Narayanapur S.O (Gajapati)",
          pinCode: 761212,
        },
        {
          postOffice: "Nuagada S.O",
          pinCode: 761214,
        },
        {
          postOffice: "Odava S.O",
          pinCode: 761217,
        },
        {
          postOffice: "Panigonda B.O",
          pinCode: 761217,
        },
        {
          postOffice: "Paralakhemundi Bus Stand S.O",
          pinCode: 761200,
        },
        {
          postOffice: "Parida B.O",
          pinCode: 761208,
        },
        {
          postOffice: "Parimal B.O",
          pinCode: 761016,
        },
        {
          postOffice: "Parisola B.O",
          pinCode: 761213,
        },
        {
          postOffice: "Parisola B.O",
          pinCode: 761016,
        },
        {
          postOffice: "Parlakhemundi H.O",
          pinCode: 761200,
        },
        {
          postOffice: "Patiguda B.O",
          pinCode: 761014,
        },
        {
          postOffice: "Patikota B.O",
          pinCode: 761211,
        },
        {
          postOffice: "Pedakotturu B.O",
          pinCode: 761215,
        },
        {
          postOffice: "Pindkii B.O",
          pinCode: 761015,
        },
        {
          postOffice: "Pothara B.O",
          pinCode: 761212,
        },
        {
          postOffice: "Puturupada B.O",
          pinCode: 761016,
        },
        {
          postOffice: "R Sitapur B.O",
          pinCode: 761211,
        },
        {
          postOffice: "R.Udayagiri S.O",
          pinCode: 761016,
        },
        {
          postOffice: "Ramagiri B.O",
          pinCode: 761016,
        },
        {
          postOffice: "Ranadevi B.O",
          pinCode: 761211,
        },
        {
          postOffice: "Ranalai B.O",
          pinCode: 761017,
        },
        {
          postOffice: "Randiba B.O",
          pinCode: 761016,
        },
        {
          postOffice: "Ranipeta B.O",
          pinCode: 761201,
        },
        {
          postOffice: "Rasibad B.O",
          pinCode: 761212,
        },
        {
          postOffice: "Rayagada S.O",
          pinCode: 761213,
        },
        {
          postOffice: "Sabara B.O",
          pinCode: 761215,
        },
        {
          postOffice: "Sabarapalli B.O",
          pinCode: 761016,
        },
        {
          postOffice: "Sailada B.O",
          pinCode: 761211,
        },
        {
          postOffice: "Sambalapur (GM) B.O",
          pinCode: 761016,
        },
        {
          postOffice: "Sansada B.O",
          pinCode: 761212,
        },
        {
          postOffice: "Saradapur B.O",
          pinCode: 761210,
        },
        {
          postOffice: "Seranga B.O",
          pinCode: 761207,
        },
        {
          postOffice: "Siali B.O",
          pinCode: 761206,
        },
        {
          postOffice: "Sialilati B.O",
          pinCode: 761017,
        },
        {
          postOffice: "Sidhamadango B.O",
          pinCode: 761201,
        },
        {
          postOffice: "Sindhiba B.O",
          pinCode: 761207,
        },
        {
          postOffice: "Singipur B.O",
          pinCode: 761014,
        },
        {
          postOffice: "Singipur B.O",
          pinCode: 761215,
        },
        {
          postOffice: "Sinkulipadar B.O",
          pinCode: 761015,
        },
        {
          postOffice: "Station Road Paralakhemundi S.O",
          pinCode: 761201,
        },
        {
          postOffice: "Suluba B.O",
          pinCode: 761017,
        },
        {
          postOffice: "T.Govindapur B.O",
          pinCode: 761015,
        },
        {
          postOffice: "Tabarada B.O",
          pinCode: 761214,
        },
        {
          postOffice: "Tabarasingi B.O",
          pinCode: 761016,
        },
        {
          postOffice: "Talamunda B.O",
          pinCode: 761212,
        },
        {
          postOffice: "Tampakaviti B.O",
          pinCode: 761211,
        },
        {
          postOffice: "Tarangada B.O",
          pinCode: 761201,
        },
        {
          postOffice: "Tatipati B.O",
          pinCode: 761210,
        },
        {
          postOffice: "Tumula B.O",
          pinCode: 761207,
        },
        {
          postOffice: "Uppalada S.O",
          pinCode: 761211,
        },
        {
          postOffice: "Valada B.O",
          pinCode: 761206,
        },
      ],
      Ganjam: [
        {
          postOffice: "A.K.Deuli B.O",
          pinCode: 761111,
        },
        {
          postOffice: "Adapada B.O",
          pinCode: 761144,
        },
        {
          postOffice: "Adipur B.O",
          pinCode: 761118,
        },
        {
          postOffice: "Agastinuagam B.O",
          pinCode: 761020,
        },
        {
          postOffice: "Aitipur B.O",
          pinCode: 761029,
        },
        {
          postOffice: "Aladi B.O",
          pinCode: 761120,
        },
        {
          postOffice: "Alasuguma B.O",
          pinCode: 761121,
        },
        {
          postOffice: "Andanda B.O",
          pinCode: 761005,
        },
        {
          postOffice: "Angaragam B.O",
          pinCode: 761035,
        },
        {
          postOffice: "Ankorada B.O",
          pinCode: 761012,
        },
        {
          postOffice: "Ankuli B.O",
          pinCode: 760010,
        },
        {
          postOffice: "Ankushpur B.O",
          pinCode: 761100,
        },
        {
          postOffice: "Antaraba B.O",
          pinCode: 761017,
        },
        {
          postOffice: "Antarapada B.O",
          pinCode: 761117,
        },
        {
          postOffice: "Antarigam B.O",
          pinCode: 761043,
        },
        {
          postOffice: "Arakhapur B.O",
          pinCode: 761117,
        },
        {
          postOffice: "Arakhapur B.O",
          pinCode: 761041,
        },
        {
          postOffice: "Aska College Square S.O",
          pinCode: 761110,
        },
        {
          postOffice: "Aska H.O",
          pinCode: 761110,
        },
        {
          postOffice: "Aska Junction S.O",
          pinCode: 761110,
        },
        {
          postOffice: "Asura Bandha S.O",
          pinCode: 761151,
        },
        {
          postOffice: "Athagadapatna B.O",
          pinCode: 761105,
        },
        {
          postOffice: "B D Sahi Bellagunhta S.O",
          pinCode: 761119,
        },
        {
          postOffice: "B.D.Pur B.O",
          pinCode: 761120,
        },
        {
          postOffice: "B.Karadabadi B.O",
          pinCode: 761143,
        },
        {
          postOffice: "B.Kotibadi B.O",
          pinCode: 761108,
        },
        {
          postOffice: "B.L.N.Pur B.O",
          pinCode: 761032,
        },
        {
          postOffice: "B.L.N.Pur B.O",
          pinCode: 761011,
        },
        {
          postOffice: "B.L.S.Pur B.O",
          pinCode: 761119,
        },
        {
          postOffice: "B.Nuagam B.O",
          pinCode: 761006,
        },
        {
          postOffice: "B.Nuapalli B.O",
          pinCode: 761104,
        },
        {
          postOffice: "B.Pankalbadi B.O",
          pinCode: 761118,
        },
        {
          postOffice: "B.Turubudi B.O",
          pinCode: 761007,
        },
        {
          postOffice: "Baaruda B.O",
          pinCode: 761131,
        },
        {
          postOffice: "Babanpur B.O",
          pinCode: 761111,
        },
        {
          postOffice: "Bada Aryapalli B.O",
          pinCode: 761045,
        },
        {
          postOffice: "Badabadangi B.O",
          pinCode: 761108,
        },
        {
          postOffice: "Badabaraba B.O",
          pinCode: 761151,
        },
        {
          postOffice: "Badabaragam B.O",
          pinCode: 761018,
        },
        {
          postOffice: "Badabaranga B.O",
          pinCode: 761004,
        },
        {
          postOffice: "Badaborasingi B.O",
          pinCode: 761124,
        },
        {
          postOffice: "Badachakada B.O",
          pinCode: 761019,
        },
        {
          postOffice: "Badadumbala B.O",
          pinCode: 761042,
        },
        {
          postOffice: "Badagada S.O",
          pinCode: 761109,
        },
        {
          postOffice: "Badagochha B.O",
          pinCode: 761151,
        },
        {
          postOffice: "Badakhairakhama B.O",
          pinCode: 761035,
        },
        {
          postOffice: "Badakhajahari B.O",
          pinCode: 761011,
        },
        {
          postOffice: "Badakhandi B.O",
          pinCode: 761101,
        },
        {
          postOffice: "Badakharida S.O",
          pinCode: 761041,
        },
        {
          postOffice: "Badakhemundi Street S.O",
          pinCode: 760001,
        },
        {
          postOffice: "Badakholi B.O",
          pinCode: 761116,
        },
        {
          postOffice: "Badakodanda S.O",
          pinCode: 761125,
        },
        {
          postOffice: "Badakusasthali B.O",
          pinCode: 760007,
        },
        {
          postOffice: "Badamadhapur B.O",
          pinCode: 761026,
        },
        {
          postOffice: "Badamahuri B.O",
          pinCode: 761041,
        },
        {
          postOffice: "Badangi B.O",
          pinCode: 761141,
        },
        {
          postOffice: "Badapada B.O",
          pinCode: 761124,
        },
        {
          postOffice: "Badapalanka B.O",
          pinCode: 761010,
        },
        {
          postOffice: "Badapalli B.O",
          pinCode: 761029,
        },
        {
          postOffice: "Badapur B.O",
          pinCode: 760007,
        },
        {
          postOffice: "Badaputi B.O",
          pinCode: 761002,
        },
        {
          postOffice: "Badarampalli B.O",
          pinCode: 761019,
        },
        {
          postOffice: "Badhinuapalli B.O",
          pinCode: 761030,
        },
        {
          postOffice: "Badiosta B.O",
          pinCode: 761054,
        },
        {
          postOffice: "Badula B.O",
          pinCode: 761114,
        },
        {
          postOffice: "Baghala B.O",
          pinCode: 761003,
        },
        {
          postOffice: "Bahadapadar B.O",
          pinCode: 761125,
        },
        {
          postOffice: "Bahadurpeta B.O",
          pinCode: 760007,
        },
        {
          postOffice: "Baharpur B.O",
          pinCode: 761107,
        },
        {
          postOffice: "Baidyanathpur S.O",
          pinCode: 760004,
        },
        {
          postOffice: "Balarampur B.O",
          pinCode: 761109,
        },
        {
          postOffice: "Baliapata B.O",
          pinCode: 761131,
        },
        {
          postOffice: "Baliasara B.O",
          pinCode: 761104,
        },
        {
          postOffice: "Balichhai B.O",
          pinCode: 761111,
        },
        {
          postOffice: "Balisahi B.O",
          pinCode: 761131,
        },
        {
          postOffice: "Balisira B.O",
          pinCode: 761115,
        },
        {
          postOffice: "Ballijodi B.O",
          pinCode: 761042,
        },
        {
          postOffice: "Ballipada S.O",
          pinCode: 761054,
        },
        {
          postOffice: "Ballipadar S.O",
          pinCode: 761117,
        },
        {
          postOffice: "Balunkeswarapur B.O",
          pinCode: 761030,
        },
        {
          postOffice: "Banabulapalli B.O",
          pinCode: 761020,
        },
        {
          postOffice: "Banadevi Patna S.O",
          pinCode: 761104,
        },
        {
          postOffice: "Banamali B.O",
          pinCode: 761011,
        },
        {
          postOffice: "Bandhaguda B.O",
          pinCode: 761106,
        },
        {
          postOffice: "Bangarada B.O",
          pinCode: 761123,
        },
        {
          postOffice: "Bania B.O",
          pinCode: 761030,
        },
        {
          postOffice: "Bansola B.O",
          pinCode: 761006,
        },
        {
          postOffice: "Banthapalli B.O",
          pinCode: 760002,
        },
        {
          postOffice: "Banthapalli B.O",
          pinCode: 761105,
        },
        {
          postOffice: "Baradabilli B.O",
          pinCode: 761107,
        },
        {
          postOffice: "Baragam B.O",
          pinCode: 761111,
        },
        {
          postOffice: "Baragam S.O",
          pinCode: 761120,
        },
        {
          postOffice: "Baramundalli B.O",
          pinCode: 761106,
        },
        {
          postOffice: "Barango B.O",
          pinCode: 761006,
        },
        {
          postOffice: "Barasara B.O",
          pinCode: 761030,
        },
        {
          postOffice: "Barida B.O",
          pinCode: 761104,
        },
        {
          postOffice: "Baritola B.O",
          pinCode: 761055,
        },
        {
          postOffice: "Baulagam B.O",
          pinCode: 761026,
        },
        {
          postOffice: "Baulojholi B.O",
          pinCode: 761100,
        },
        {
          postOffice: "Baunsalundi B.O",
          pinCode: 761125,
        },
        {
          postOffice: "Beguniapada S.O",
          pinCode: 761031,
        },
        {
          postOffice: "Bellagam B.O",
          pinCode: 761003,
        },
        {
          postOffice: "Bellagam B.O",
          pinCode: 761105,
        },
        {
          postOffice: "Bellagunhta S.O",
          pinCode: 761119,
        },
        {
          postOffice: "Benapata B.O",
          pinCode: 761122,
        },
        {
          postOffice: "Bendalia B.O",
          pinCode: 760002,
        },
        {
          postOffice: "Benipalli B.O",
          pinCode: 761124,
        },
        {
          postOffice: "Berhampur City S.O",
          pinCode: 760002,
        },
        {
          postOffice: "Berhampur RS S.O",
          pinCode: 760005,
        },
        {
          postOffice: "Berhampur University S.O",
          pinCode: 760007,
        },
        {
          postOffice: "Berhampur(GM) H.O",
          pinCode: 760001,
        },
        {
          postOffice: "Beruanbadi B.O",
          pinCode: 761032,
        },
        {
          postOffice: "Betarasingi B.O",
          pinCode: 761118,
        },
        {
          postOffice: "Bethuara B.O",
          pinCode: 761107,
        },
        {
          postOffice: "Bhabandha B.O",
          pinCode: 761003,
        },
        {
          postOffice: "Bhabarada B.O",
          pinCode: 761105,
        },
        {
          postOffice: "Bhabinipur B.O",
          pinCode: 761001,
        },
        {
          postOffice: "Bhagabanpur B.O",
          pinCode: 761151,
        },
        {
          postOffice: "Bhamsyali B.O",
          pinCode: 761118,
        },
        {
          postOffice: "Bhanjamargo S.O",
          pinCode: 761126,
        },
        {
          postOffice: "Bhanjanagar College S.O",
          pinCode: 761126,
        },
        {
          postOffice: "Bhanjanagar Bazar S.O",
          pinCode: 761126,
        },
        {
          postOffice: "Bhanjanagar H.O",
          pinCode: 761126,
        },
        {
          postOffice: "Bhapur Bazar S.O",
          pinCode: 760001,
        },
        {
          postOffice: "Bharampur B.O",
          pinCode: 761209,
        },
        {
          postOffice: "Bhatakhali B.O",
          pinCode: 761117,
        },
        {
          postOffice: "Bhatakumarada S.O",
          pinCode: 761003,
        },
        {
          postOffice: "Bhejiput B.O",
          pinCode: 761029,
        },
        {
          postOffice: "Bhejiput S.O",
          pinCode: 761126,
        },
        {
          postOffice: "Bhetonoi S.O",
          pinCode: 761116,
        },
        {
          postOffice: "Bhikapada B.O",
          pinCode: 761029,
        },
        {
          postOffice: "Bhikaripalli B.O",
          pinCode: 761020,
        },
        {
          postOffice: "Bhimpur B.O",
          pinCode: 761004,
        },
        {
          postOffice: "Bhutsarasingi B.O",
          pinCode: 761041,
        },
        {
          postOffice: "Bijipur S.O",
          pinCode: 760001,
        },
        {
          postOffice: "Bikrampur B.O",
          pinCode: 761029,
        },
        {
          postOffice: "Biranchipur B.O",
          pinCode: 761143,
        },
        {
          postOffice: "Biribatia B.O",
          pinCode: 761031,
        },
        {
          postOffice: "Birikote B.O",
          pinCode: 761132,
        },
        {
          postOffice: "Biruligada B.O",
          pinCode: 761028,
        },
        {
          postOffice: "Bishnuchakra B.O",
          pinCode: 761117,
        },
        {
          postOffice: "Bissmagiri S.O",
          pinCode: 761055,
        },
        {
          postOffice: "Biswanathpur B.O",
          pinCode: 761008,
        },
        {
          postOffice: "Bolosara B.O",
          pinCode: 761104,
        },
        {
          postOffice: "Bomokei S.O",
          pinCode: 761042,
        },
        {
          postOffice: "Bonka B.O",
          pinCode: 761119,
        },
        {
          postOffice: "Borada B.O",
          pinCode: 761109,
        },
        {
          postOffice: "Bori B.O",
          pinCode: 761123,
        },
        {
          postOffice: "Borida B.O",
          pinCode: 761031,
        },
        {
          postOffice: "Borigam B.O",
          pinCode: 761001,
        },
        {
          postOffice: "Boripadar B.O",
          pinCode: 761007,
        },
        {
          postOffice: "Boxipalli B.O",
          pinCode: 761002,
        },
        {
          postOffice: "Brahmanchhai B.O",
          pinCode: 761103,
        },
        {
          postOffice: "Brhamanapadar B.O",
          pinCode: 761132,
        },
        {
          postOffice: "Budhamba B.O",
          pinCode: 761105,
        },
        {
          postOffice: "Buduli B.O",
          pinCode: 761132,
        },
        {
          postOffice: "Buguda Badadanda Sahi B.O",
          pinCode: 761118,
        },
        {
          postOffice: "Buguda S.O",
          pinCode: 761118,
        },
        {
          postOffice: "Bupilingi B.O",
          pinCode: 761020,
        },
        {
          postOffice: "Burujhuri Nuagam B.O",
          pinCode: 761035,
        },
        {
          postOffice: "Burupada S.O",
          pinCode: 761146,
        },
        {
          postOffice: "Burutal B.O",
          pinCode: 761005,
        },
        {
          postOffice: "Ch.Tikarapada B.O",
          pinCode: 761209,
        },
        {
          postOffice: "Chaitanyapur B.O",
          pinCode: 761007,
        },
        {
          postOffice: "Chamakhandi B.O",
          pinCode: 761020,
        },
        {
          postOffice: "Chamunda B.O",
          pinCode: 761121,
        },
        {
          postOffice: "Chanamari B.O",
          pinCode: 761014,
        },
        {
          postOffice: "Chandipadar B.O",
          pinCode: 761003,
        },
        {
          postOffice: "Chandulli B.O",
          pinCode: 761102,
        },
        {
          postOffice: "Chatamundali B.O",
          pinCode: 761043,
        },
        {
          postOffice: "Chatrapur Bazar S.O",
          pinCode: 761020,
        },
        {
          postOffice: "Chatrapur H.O",
          pinCode: 761020,
        },
        {
          postOffice: "Chikalakhandi B.O",
          pinCode: 761020,
        },
        {
          postOffice: "Chikarada B.O",
          pinCode: 761008,
        },
        {
          postOffice: "Chikati Badapur B.O",
          pinCode: 761005,
        },
        {
          postOffice: "Chikili B.O",
          pinCode: 761030,
        },
        {
          postOffice: "Chikiti S.O",
          pinCode: 761010,
        },
        {
          postOffice: "Chikitipentho B.O",
          pinCode: 761010,
        },
        {
          postOffice: "Chingudighai B.O",
          pinCode: 761018,
        },
        {
          postOffice: "Chingudikhola B.O",
          pinCode: 761032,
        },
        {
          postOffice: "Chirakipadasasan B.O",
          pinCode: 761105,
        },
        {
          postOffice: "Chudangapur B.O",
          pinCode: 761012,
        },
        {
          postOffice: "Courtpeta S.O",
          pinCode: 760004,
        },
        {
          postOffice: "D.Singipur B.O",
          pinCode: 761107,
        },
        {
          postOffice: "Dabarsingi B.O",
          pinCode: 761011,
        },
        {
          postOffice: "Dadarlunda B.O",
          pinCode: 761132,
        },
        {
          postOffice: "Dakhinpur B.O",
          pinCode: 760002,
        },
        {
          postOffice: "Danapur B.O",
          pinCode: 761032,
        },
        {
          postOffice: "Dasamundali B.O",
          pinCode: 761106,
        },
        {
          postOffice: "Daspur B.O",
          pinCode: 760003,
        },
        {
          postOffice: "Dauni B.O",
          pinCode: 761011,
        },
        {
          postOffice: "Dayapalli B.O",
          pinCode: 761100,
        },
        {
          postOffice: "Debabhumi B.O",
          pinCode: 761115,
        },
        {
          postOffice: "Dekahli B.O",
          pinCode: 761042,
        },
        {
          postOffice: "Dengadi B.O",
          pinCode: 761144,
        },
        {
          postOffice: "Dengapadar B.O",
          pinCode: 761146,
        },
        {
          postOffice: "Dengapadar B.O",
          pinCode: 761054,
        },
        {
          postOffice: "Dhabalpur B.O",
          pinCode: 761106,
        },
        {
          postOffice: "Dhanantara B.O",
          pinCode: 761106,
        },
        {
          postOffice: "Dhaninja B.O",
          pinCode: 761116,
        },
        {
          postOffice: "Dharakote S.O",
          pinCode: 761107,
        },
        {
          postOffice: "Dhaugam B.O",
          pinCode: 761111,
        },
        {
          postOffice: "Dhobadipatapur B.O",
          pinCode: 761003,
        },
        {
          postOffice: "Dhumchai B.O",
          pinCode: 761140,
        },
        {
          postOffice: "Dhunkapada B.O",
          pinCode: 761118,
        },
        {
          postOffice: "Digapada B.O",
          pinCode: 761032,
        },
        {
          postOffice: "Digapahandi S.O",
          pinCode: 761012,
        },
        {
          postOffice: "Digapahandi Tahasil Colony S.O",
          pinCode: 761012,
        },
        {
          postOffice: "Dihapadhala B.O",
          pinCode: 761140,
        },
        {
          postOffice: "Dimiria B.O",
          pinCode: 761028,
        },
        {
          postOffice: "Domuhani B.O",
          pinCode: 761141,
        },
        {
          postOffice: "Dubuduba B.O",
          pinCode: 761125,
        },
        {
          postOffice: "Dumakumpa B.O",
          pinCode: 761125,
        },
        {
          postOffice: "Dura B.O",
          pinCode: 760010,
        },
        {
          postOffice: "Durabandha B.O",
          pinCode: 761101,
        },
        {
          postOffice: "Ekalpur B.O",
          pinCode: 761109,
        },
        {
          postOffice: "Engineering School S.O",
          pinCode: 760010,
        },
        {
          postOffice: "Erendra B.O",
          pinCode: 761013,
        },
        {
          postOffice: "G.D.Palli B.O",
          pinCode: 761111,
        },
        {
          postOffice: "G.D.Palli B.O",
          pinCode: 761107,
        },
        {
          postOffice: "G.Dengapadar B.O",
          pinCode: 761124,
        },
        {
          postOffice: "G.Nuagam B.O",
          pinCode: 761140,
        },
        {
          postOffice: "G.Rambha B.O",
          pinCode: 761132,
        },
        {
          postOffice: "Gadasamantarapur B.O",
          pinCode: 761055,
        },
        {
          postOffice: "Gahangu B.O",
          pinCode: 761117,
        },
        {
          postOffice: "Gallery S.O",
          pinCode: 761141,
        },
        {
          postOffice: "Gamundi B.O",
          pinCode: 761125,
        },
        {
          postOffice: "Gandadhara B.O",
          pinCode: 761121,
        },
        {
          postOffice: "Gandhinagar S.O (Ganjam)",
          pinCode: 760001,
        },
        {
          postOffice: "Gangapur (Ganjam) S.O",
          pinCode: 761123,
        },
        {
          postOffice: "Gangapur B.O",
          pinCode: 761109,
        },
        {
          postOffice: "Gangapur B.O",
          pinCode: 761104,
        },
        {
          postOffice: "Gangapur B.O",
          pinCode: 761013,
        },
        {
          postOffice: "Ganjam S.O",
          pinCode: 761026,
        },
        {
          postOffice: "Ganju B.O",
          pinCode: 761002,
        },
        {
          postOffice: "Gatebazar S.O",
          pinCode: 760001,
        },
        {
          postOffice: "Gaudagotha B.O",
          pinCode: 761109,
        },
        {
          postOffice: "Gaudiabarada B.O",
          pinCode: 761118,
        },
        {
          postOffice: "Gayaganda B.O",
          pinCode: 761131,
        },
        {
          postOffice: "Gazalbadi B.O",
          pinCode: 761151,
        },
        {
          postOffice: "Genja B.O",
          pinCode: 761108,
        },
        {
          postOffice: "Gerada B.O",
          pinCode: 761131,
        },
        {
          postOffice: "Ghodapolan B.O",
          pinCode: 761104,
        },
        {
          postOffice: "Girisola S.O",
          pinCode: 761009,
        },
        {
          postOffice: "Gnagadahani B.O",
          pinCode: 761018,
        },
        {
          postOffice: "Gobara S.O",
          pinCode: 761124,
        },
        {
          postOffice: "Gobindapur B.O",
          pinCode: 761146,
        },
        {
          postOffice: "Gochabadi B.O",
          pinCode: 761105,
        },
        {
          postOffice: "Godagovindapur B.O",
          pinCode: 761011,
        },
        {
          postOffice: "Godavarishanagar S.O",
          pinCode: 760001,
        },
        {
          postOffice: "Goilundi S.0",
          pinCode: 760004,
        },
        {
          postOffice: "Gokarnapur B.O",
          pinCode: 761012,
        },
        {
          postOffice: "Golabandha B.O",
          pinCode: 761118,
        },
        {
          postOffice: "Golabandha S.O",
          pinCode: 761052,
        },
        {
          postOffice: "Golagandapalli B.O",
          pinCode: 761028,
        },
        {
          postOffice: "Golamundala B.O",
          pinCode: 761118,
        },
        {
          postOffice: "Golanda B.O",
          pinCode: 761007,
        },
        {
          postOffice: "Golanthara S.O",
          pinCode: 761008,
        },
        {
          postOffice: "Golapada B.O",
          pinCode: 761131,
        },
        {
          postOffice: "Golia B.O",
          pinCode: 761118,
        },
        {
          postOffice: "Gondala B.O",
          pinCode: 761003,
        },
        {
          postOffice: "Gopalpur S.O (Ganjam)",
          pinCode: 761002,
        },
        {
          postOffice: "Gopalpursasan B.O",
          pinCode: 761108,
        },
        {
          postOffice: "Gopinath Patna S.O",
          pinCode: 761104,
        },
        {
          postOffice: "Gopinathpur B.O",
          pinCode: 761100,
        },
        {
          postOffice: "Gopinathpur B.O",
          pinCode: 761009,
        },
        {
          postOffice: "Gosaninuagam S.O",
          pinCode: 760003,
        },
        {
          postOffice: "Gothagam B.O",
          pinCode: 761146,
        },
        {
          postOffice: "Gothagam B.O",
          pinCode: 761037,
        },
        {
          postOffice: "Goudagam B.O",
          pinCode: 761011,
        },
        {
          postOffice: "Gouradeipur B.O",
          pinCode: 761032,
        },
        {
          postOffice: "Goutami B.O",
          pinCode: 761054,
        },
        {
          postOffice: "Govindanagar B.O",
          pinCode: 761008,
        },
        {
          postOffice: "Gudiali B.O",
          pinCode: 761104,
        },
        {
          postOffice: "Gudipadar B.O",
          pinCode: 761006,
        },
        {
          postOffice: "Guhalpur B.O",
          pinCode: 761007,
        },
        {
          postOffice: "Guma Dalaba B.O",
          pinCode: 761209,
        },
        {
          postOffice: "Gundra B.O",
          pinCode: 761005,
        },
        {
          postOffice: "Gundribadi B.O",
          pinCode: 761132,
        },
        {
          postOffice: "Gunthapada S.O",
          pinCode: 761115,
        },
        {
          postOffice: "Gurunthi B.O",
          pinCode: 761001,
        },
        {
          postOffice: "Guzurali B.O",
          pinCode: 761131,
        },
        {
          postOffice: "Haladiapadar B.O",
          pinCode: 760003,
        },
        {
          postOffice: "Haridapadar B.O",
          pinCode: 761111,
        },
        {
          postOffice: "Harigada B.O",
          pinCode: 761141,
        },
        {
          postOffice: "Haripur B.O",
          pinCode: 761009,
        },
        {
          postOffice: "Haripur Burudi B.O",
          pinCode: 761027,
        },
        {
          postOffice: "Hatiota B.O",
          pinCode: 761117,
        },
        {
          postOffice: "Hatnagar B.O",
          pinCode: 761126,
        },
        {
          postOffice: "Hillpatna S.O",
          pinCode: 760005,
        },
        {
          postOffice: "Hindola B.O",
          pinCode: 761104,
        },
        {
          postOffice: "Hinjilicut S.O",
          pinCode: 761102,
        },
        {
          postOffice: "Hinjlicut College Road S.O",
          pinCode: 761102,
        },
        {
          postOffice: "Hottapur B.O",
          pinCode: 761018,
        },
        {
          postOffice: "Hugulapata B.O",
          pinCode: 761001,
        },
        {
          postOffice: "Hukuma B.O",
          pinCode: 761108,
        },
        {
          postOffice: "Hukuma B.O",
          pinCode: 761209,
        },
        {
          postOffice: "Humma S.O",
          pinCode: 761027,
        },
        {
          postOffice: "Humuki B.O",
          pinCode: 761111,
        },
        {
          postOffice: "Humuri B.O",
          pinCode: 761020,
        },
        {
          postOffice: "Indragada B.O",
          pinCode: 761125,
        },
        {
          postOffice: "Indrakhi B.O",
          pinCode: 761008,
        },
        {
          postOffice: "Industrial Estates S.O",
          pinCode: 760008,
        },
        {
          postOffice: "Inginathi B.O",
          pinCode: 761140,
        },
        {
          postOffice: "J.Balabhadrapur B.O",
          pinCode: 761013,
        },
        {
          postOffice: "Jaccaro B.O",
          pinCode: 761042,
        },
        {
          postOffice: "Jagadalapur B.O",
          pinCode: 761001,
        },
        {
          postOffice: "Jagamohan B.O",
          pinCode: 761114,
        },
        {
          postOffice: "Jagamohanapur B.O",
          pinCode: 761010,
        },
        {
          postOffice: "Jagannath Prasad S.O",
          pinCode: 761121,
        },
        {
          postOffice: "Jagannathpur B.O",
          pinCode: 761003,
        },
        {
          postOffice: "Jagilipadar B.O",
          pinCode: 761032,
        },
        {
          postOffice: "Jahada B.O",
          pinCode: 761107,
        },
        {
          postOffice: "Jakara B.O",
          pinCode: 761105,
        },
        {
          postOffice: "Jamuni B.O",
          pinCode: 761018,
        },
        {
          postOffice: "Janibilli B.O",
          pinCode: 761107,
        },
        {
          postOffice: "Jarada Ankuli B.O",
          pinCode: 761005,
        },
        {
          postOffice: "Jaradagada S.O",
          pinCode: 761005,
        },
        {
          postOffice: "Jayantipur S.O",
          pinCode: 761006,
        },
        {
          postOffice: "Jayapur B.O",
          pinCode: 761111,
        },
        {
          postOffice: "Jayashree S.O",
          pinCode: 761025,
        },
        {
          postOffice: "Jhadabai B.O",
          pinCode: 761104,
        },
        {
          postOffice: "Jhadabandha B.O",
          pinCode: 761114,
        },
        {
          postOffice: "Jhadabhumi B.O",
          pinCode: 761120,
        },
        {
          postOffice: "Jhadankuli B.O",
          pinCode: 761001,
        },
        {
          postOffice: "Jharapari B.O",
          pinCode: 761114,
        },
        {
          postOffice: "Jharipadar B.O",
          pinCode: 761007,
        },
        {
          postOffice: "Jhatipadar B.O",
          pinCode: 761009,
        },
        {
          postOffice: "Jillundi S.O",
          pinCode: 761133,
        },
        {
          postOffice: "Jorada B.O",
          pinCode: 761104,
        },
        {
          postOffice: "K.Berhampur B.O",
          pinCode: 761140,
        },
        {
          postOffice: "K.Jatabadi B.O",
          pinCode: 761108,
        },
        {
          postOffice: "K.Karadakana B.O",
          pinCode: 761106,
        },
        {
          postOffice: "K.Nuagada B.O",
          pinCode: 761123,
        },
        {
          postOffice: "Kabisuryanagar S.O",
          pinCode: 761104,
        },
        {
          postOffice: "Kachakhandi B.O",
          pinCode: 761106,
        },
        {
          postOffice: "Kadapada B.O",
          pinCode: 761121,
        },
        {
          postOffice: "Kadua B.O",
          pinCode: 761121,
        },
        {
          postOffice: "Kaithkhandi B.O",
          pinCode: 761007,
        },
        {
          postOffice: "Kalabada B.O",
          pinCode: 761010,
        },
        {
          postOffice: "Kalambo B.O",
          pinCode: 761105,
        },
        {
          postOffice: "Kalasandhapur B.O",
          pinCode: 761111,
        },
        {
          postOffice: "Kaliaguda B.O",
          pinCode: 761124,
        },
        {
          postOffice: "Kalidaspur B.O",
          pinCode: 761043,
        },
        {
          postOffice: "Kalingapadar B.O",
          pinCode: 761131,
        },
        {
          postOffice: "Kallipalli B.O",
          pinCode: 761002,
        },
        {
          postOffice: "Kalyanapur B.O",
          pinCode: 761026,
        },
        {
          postOffice: "Kamagada B.O",
          pinCode: 761122,
        },
        {
          postOffice: "Kampa Khumbajhari B.O",
          pinCode: 761209,
        },
        {
          postOffice: "Kanabhaga B.O",
          pinCode: 761140,
        },
        {
          postOffice: "Kanachhai B.O",
          pinCode: 761118,
        },
        {
          postOffice: "Kanaka B.O",
          pinCode: 761028,
        },
        {
          postOffice: "Kanamana B.O",
          pinCode: 761045,
        },
        {
          postOffice: "Kanasukha B.O",
          pinCode: 761118,
        },
        {
          postOffice: "Kanchana B.O",
          pinCode: 761031,
        },
        {
          postOffice: "Kanchuru S.O",
          pinCode: 761101,
        },
        {
          postOffice: "Kaniary B.O",
          pinCode: 761111,
        },
        {
          postOffice: "Kansamari B.O",
          pinCode: 761014,
        },
        {
          postOffice: "Karachulli S.O",
          pinCode: 761143,
        },
        {
          postOffice: "Karada B.O",
          pinCode: 761151,
        },
        {
          postOffice: "Karadabadi (A) B.O",
          pinCode: 761117,
        },
        {
          postOffice: "Karapada B.O",
          pinCode: 761026,
        },
        {
          postOffice: "Karapada B.O",
          pinCode: 761042,
        },
        {
          postOffice: "Karasinghi B.O",
          pinCode: 761143,
        },
        {
          postOffice: "Karatoli B.O",
          pinCode: 761020,
        },
        {
          postOffice: "Kaudia B.O",
          pinCode: 761144,
        },
        {
          postOffice: "Kaviti Suvani B.O",
          pinCode: 761009,
        },
        {
          postOffice: "Kelua B.O",
          pinCode: 761004,
        },
        {
          postOffice: "Keluapalli B.O",
          pinCode: 760003,
        },
        {
          postOffice: "Kendupadar B.O",
          pinCode: 761122,
        },
        {
          postOffice: "Kendupata B.O",
          pinCode: 761030,
        },
        {
          postOffice: "Kesaripada B.O",
          pinCode: 761006,
        },
        {
          postOffice: "Khairaputi B.O",
          pinCode: 761123,
        },
        {
          postOffice: "Khajapalli B.O",
          pinCode: 761029,
        },
        {
          postOffice: "Khajipalli B.O",
          pinCode: 761019,
        },
        {
          postOffice: "Khallikote College S.O",
          pinCode: 760001,
        },
        {
          postOffice: "Khallikote RS S.O",
          pinCode: 761029,
        },
        {
          postOffice: "Khallikote S.O",
          pinCode: 761030,
        },
        {
          postOffice: "Khallingi B.O",
          pinCode: 761013,
        },
        {
          postOffice: "Khamaredi B.O",
          pinCode: 761125,
        },
        {
          postOffice: "Khamarigam B.O",
          pinCode: 761055,
        },
        {
          postOffice: "Khamarpalli B.O",
          pinCode: 761120,
        },
        {
          postOffice: "Khambarigam B.O",
          pinCode: 761004,
        },
        {
          postOffice: "Khambeswari Patna S.O",
          pinCode: 761110,
        },
        {
          postOffice: "Khandadeuli B.O",
          pinCode: 761028,
        },
        {
          postOffice: "Khanduru B.O",
          pinCode: 761105,
        },
        {
          postOffice: "Kharia B.O",
          pinCode: 761111,
        },
        {
          postOffice: "Khariaguda S.O",
          pinCode: 761209,
        },
        {
          postOffice: "Kharida B.O",
          pinCode: 761102,
        },
        {
          postOffice: "Kharnipada B.O",
          pinCode: 761037,
        },
        {
          postOffice: "Khetamundali B.O",
          pinCode: 761131,
        },
        {
          postOffice: "Khetribarapur B.O",
          pinCode: 761123,
        },
        {
          postOffice: "Kholakhalli B.O",
          pinCode: 761118,
        },
        {
          postOffice: "Kirapalli B.O",
          pinCode: 761119,
        },
        {
          postOffice: "Kodala Bus Stand B.O",
          pinCode: 761032,
        },
        {
          postOffice: "Kodala S.O",
          pinCode: 761032,
        },
        {
          postOffice: "Kodala Tahasil Colony S.O",
          pinCode: 761032,
        },
        {
          postOffice: "Koirasi B.O",
          pinCode: 761029,
        },
        {
          postOffice: "Kokolamba B.O",
          pinCode: 761131,
        },
        {
          postOffice: "Kolathia B.O",
          pinCode: 761010,
        },
        {
          postOffice: "Komanda B.O",
          pinCode: 761019,
        },
        {
          postOffice: "Konheipur B.O",
          pinCode: 761029,
        },
        {
          postOffice: "Konika B.O",
          pinCode: 761008,
        },
        {
          postOffice: "Konisi B.O",
          pinCode: 761008,
        },
        {
          postOffice: "Konkarada S.O",
          pinCode: 761144,
        },
        {
          postOffice: "Kotharasingi B.O",
          pinCode: 761008,
        },
        {
          postOffice: "Kotinada B.O",
          pinCode: 761111,
        },
        {
          postOffice: "Kottilingi B.O",
          pinCode: 761010,
        },
        {
          postOffice: "Koturu B.O",
          pinCode: 761009,
        },
        {
          postOffice: "Krupasindhupur B.O",
          pinCode: 761001,
        },
        {
          postOffice: "Krushanapur B.O",
          pinCode: 761010,
        },
        {
          postOffice: "Kudutei B.O",
          pinCode: 761119,
        },
        {
          postOffice: "Kukudakhandi S.O",
          pinCode: 761100,
        },
        {
          postOffice: "Kullada S.O",
          pinCode: 761131,
        },
        {
          postOffice: "Kullagada B.O",
          pinCode: 761106,
        },
        {
          postOffice: "Kullangi B.O",
          pinCode: 761124,
        },
        {
          postOffice: "Kumaripari B.O",
          pinCode: 761035,
        },
        {
          postOffice: "Kumarpani B.O",
          pinCode: 761106,
        },
        {
          postOffice: "Kumbhari B.O",
          pinCode: 761111,
        },
        {
          postOffice: "Kumpapada B.O",
          pinCode: 761121,
        },
        {
          postOffice: "Kumundi B.O",
          pinCode: 761121,
        },
        {
          postOffice: "Kupati B.O",
          pinCode: 761141,
        },
        {
          postOffice: "Kurla B.O",
          pinCode: 761144,
        },
        {
          postOffice: "Kusapada B.O",
          pinCode: 761012,
        },
        {
          postOffice: "Kushadhipa B.O",
          pinCode: 761030,
        },
        {
          postOffice: "Kusuraba B.O",
          pinCode: 761114,
        },
        {
          postOffice: "L.N.Pur B.O",
          pinCode: 761011,
        },
        {
          postOffice: "Ladigam B.O",
          pinCode: 760003,
        },
        {
          postOffice: "Landajuali B.O",
          pinCode: 761122,
        },
        {
          postOffice: "Langaleswar B.O",
          pinCode: 761029,
        },
        {
          postOffice: "Lanjipalli S.O",
          pinCode: 760008,
        },
        {
          postOffice: "Lathi B.O",
          pinCode: 760002,
        },
        {
          postOffice: "Lathipada B.O",
          pinCode: 761108,
        },
        {
          postOffice: "Laxmipur B.O",
          pinCode: 761003,
        },
        {
          postOffice: "Lembhai B.O",
          pinCode: 761131,
        },
        {
          postOffice: "Lochapada B.O",
          pinCode: 761001,
        },
        {
          postOffice: "Madhabandha B.O",
          pinCode: 761010,
        },
        {
          postOffice: "Madhabarida B.O",
          pinCode: 761124,
        },
        {
          postOffice: "Madhupalli B.O",
          pinCode: 761105,
        },
        {
          postOffice: "Madhuruchua B.O",
          pinCode: 761028,
        },
        {
          postOffice: "Mahachhai B.O",
          pinCode: 761103,
        },
        {
          postOffice: "Mahanadapur B.O",
          pinCode: 761026,
        },
        {
          postOffice: "Mahanal B.O",
          pinCode: 761013,
        },
        {
          postOffice: "Mahupadar B.O",
          pinCode: 761106,
        },
        {
          postOffice: "Makarjhola B.O",
          pinCode: 761101,
        },
        {
          postOffice: "Malaspadar B.O",
          pinCode: 761125,
        },
        {
          postOffice: "Mallada B.O",
          pinCode: 761027,
        },
        {
          postOffice: "Mandar B.O",
          pinCode: 761117,
        },
        {
          postOffice: "Mandarada B.O",
          pinCode: 761209,
        },
        {
          postOffice: "Mangalpur B.O",
          pinCode: 761115,
        },
        {
          postOffice: "Mangalpur B.O",
          pinCode: 761117,
        },
        {
          postOffice: "Manikyapur B.O",
          pinCode: 761042,
        },
        {
          postOffice: "Manikyapur B.O",
          pinCode: 761107,
        },
        {
          postOffice: "Manitara B.O",
          pinCode: 761118,
        },
        {
          postOffice: "Mantridi B.O",
          pinCode: 761008,
        },
        {
          postOffice: "Mardakote B.O",
          pinCode: 761032,
        },
        {
          postOffice: "Mardamekha B.O",
          pinCode: 761032,
        },
        {
          postOffice: "Markandi B.O",
          pinCode: 760003,
        },
        {
          postOffice: "Masabadi B.O",
          pinCode: 761131,
        },
        {
          postOffice: "Mathasarasingi B.O",
          pinCode: 761032,
        },
        {
          postOffice: "Mathura B.O",
          pinCode: 761105,
        },
        {
          postOffice: "Mathura B.O",
          pinCode: 761030,
        },
        {
          postOffice: "Matikhalo S.O",
          pinCode: 761045,
        },
        {
          postOffice: "Maulabhanja B.O",
          pinCode: 761012,
        },
        {
          postOffice: "Medical College S.O (Ganjam)",
          pinCode: 760004,
        },
        {
          postOffice: "Mendrajpur B.O",
          pinCode: 761008,
        },
        {
          postOffice: "Merikote B.O",
          pinCode: 761109,
        },
        {
          postOffice: "Military Lines S.O",
          pinCode: 760001,
        },
        {
          postOffice: "Minchinipatana S.O",
          pinCode: 761028,
        },
        {
          postOffice: "Mohaguda B.O",
          pinCode: 761132,
        },
        {
          postOffice: "Mohuda B.O",
          pinCode: 760002,
        },
        {
          postOffice: "Moisanpur B.O",
          pinCode: 761004,
        },
        {
          postOffice: "Morabai B.O",
          pinCode: 761043,
        },
        {
          postOffice: "Motabadi B.O",
          pinCode: 761118,
        },
        {
          postOffice: "Mujjagada S.O",
          pinCode: 761132,
        },
        {
          postOffice: "Mundala B.O",
          pinCode: 761032,
        },
        {
          postOffice: "Mundamarai S.O",
          pinCode: 761114,
        },
        {
          postOffice: "Mundapata B.O",
          pinCode: 761042,
        },
        {
          postOffice: "Municipentho B.O",
          pinCode: 761026,
        },
        {
          postOffice: "Munigadi B.O",
          pinCode: 761122,
        },
        {
          postOffice: "Nabeen S.O",
          pinCode: 760009,
        },
        {
          postOffice: "Naikanipalli B.O",
          pinCode: 761031,
        },
        {
          postOffice: "Nalabanta B.O",
          pinCode: 761111,
        },
        {
          postOffice: "Nalihada B.O",
          pinCode: 761054,
        },
        {
          postOffice: "Nandiko B.O",
          pinCode: 761102,
        },
        {
          postOffice: "Narayanapur B.O",
          pinCode: 761209,
        },
        {
          postOffice: "Narayanapur B.O",
          pinCode: 761002,
        },
        {
          postOffice: "Narendrappur B.O",
          pinCode: 761007,
        },
        {
          postOffice: "Narendrapur B.O",
          pinCode: 761103,
        },
        {
          postOffice: "Narendrapur B.O",
          pinCode: 760007,
        },
        {
          postOffice: "Nettanga B.O",
          pinCode: 761124,
        },
        {
          postOffice: "Nimakhandi Pentho B.O",
          pinCode: 761055,
        },
        {
          postOffice: "Nimakhandi S.O",
          pinCode: 761001,
        },
        {
          postOffice: "Nimapadar B.O",
          pinCode: 761120,
        },
        {
          postOffice: "Nimina S.O",
          pinCode: 761122,
        },
        {
          postOffice: "Nuagada B.O",
          pinCode: 761107,
        },
        {
          postOffice: "Nuagam S.O",
          pinCode: 761111,
        },
        {
          postOffice: "Nuagaon B.O",
          pinCode: 761010,
        },
        {
          postOffice: "Nuapada S.O",
          pinCode: 761011,
        },
        {
          postOffice: "Nuapentho B.O",
          pinCode: 761037,
        },
        {
          postOffice: "Nunipadasasan B.O",
          pinCode: 761123,
        },
        {
          postOffice: "Odasingi B.O",
          pinCode: 761007,
        },
        {
          postOffice: "Ollarigada B.O",
          pinCode: 761100,
        },
        {
          postOffice: "P.Govindapur B.Oa",
          pinCode: 761014,
        },
        {
          postOffice: "P.Jagannathpur B.O",
          pinCode: 761013,
        },
        {
          postOffice: "P.Padmabanhpur B.O",
          pinCode: 761101,
        },
        {
          postOffice: "P.Ramachandrapur B.O",
          pinCode: 761013,
        },
        {
          postOffice: "Padadigi B.O",
          pinCode: 761037,
        },
        {
          postOffice: "Padmanavapur S.O",
          pinCode: 761007,
        },
        {
          postOffice: "Padmapur B.O",
          pinCode: 761109,
        },
        {
          postOffice: "Padmapur B.O",
          pinCode: 760003,
        },
        {
          postOffice: "Paikajamuna B.O",
          pinCode: 761104,
        },
        {
          postOffice: "Pailipada B.O",
          pinCode: 761123,
        },
        {
          postOffice: "Paladhuapalli B.O",
          pinCode: 761028,
        },
        {
          postOffice: "Palakasandha B.O",
          pinCode: 761123,
        },
        {
          postOffice: "Palakatu B.O",
          pinCode: 761108,
        },
        {
          postOffice: "Palasi B.O",
          pinCode: 761001,
        },
        {
          postOffice: "Pallibandha B.O",
          pinCode: 761026,
        },
        {
          postOffice: "Palur B.O",
          pinCode: 761027,
        },
        {
          postOffice: "Panada B.O",
          pinCode: 761055,
        },
        {
          postOffice: "Panchabhuti B.O",
          pinCode: 761121,
        },
        {
          postOffice: "Panchama B.O",
          pinCode: 761008,
        },
        {
          postOffice: "Pandarakhalli B.O",
          pinCode: 761043,
        },
        {
          postOffice: "Pandia S.O",
          pinCode: 761043,
        },
        {
          postOffice: "Pandiapathara B.O",
          pinCode: 761116,
        },
        {
          postOffice: "Pandiripada B.O",
          pinCode: 761105,
        },
        {
          postOffice: "Panditgam B.O",
          pinCode: 761029,
        },
        {
          postOffice: "Pangidi B.O",
          pinCode: 761118,
        },
        {
          postOffice: "Panigrahipentho S.O",
          pinCode: 760006,
        },
        {
          postOffice: "Pantikhari B.O",
          pinCode: 761119,
        },
        {
          postOffice: "Park Street S.O",
          pinCode: 760002,
        },
        {
          postOffice: "Patadhar B.O",
          pinCode: 761120,
        },
        {
          postOffice: "Pathara B.O",
          pinCode: 761104,
        },
        {
          postOffice: "Pathara B.O",
          pinCode: 761029,
        },
        {
          postOffice: "Patrapalli B.O",
          pinCode: 761119,
        },
        {
          postOffice: "Patrapur S.O",
          pinCode: 761004,
        },
        {
          postOffice: "Pattapur S.O",
          pinCode: 761013,
        },
        {
          postOffice: "Patulisahi B.O",
          pinCode: 761140,
        },
        {
          postOffice: "Phasi B.O",
          pinCode: 761032,
        },
        {
          postOffice: "Phasiguda B.O",
          pinCode: 761055,
        },
        {
          postOffice: "Phulta B.O",
          pinCode: 760003,
        },
        {
          postOffice: "Pitala S.O",
          pinCode: 761103,
        },
        {
          postOffice: "Pitatoli B.O",
          pinCode: 761010,
        },
        {
          postOffice: "Podapadar B.O",
          pinCode: 761020,
        },
        {
          postOffice: "Podingi B.O",
          pinCode: 761103,
        },
        {
          postOffice: "Poirasi B.O",
          pinCode: 761019,
        },
        {
          postOffice: "Polango B.O",
          pinCode: 761028,
        },
        {
          postOffice: "Polasara Nimina B.O",
          pinCode: 761105,
        },
        {
          postOffice: "Polosara S.O",
          pinCode: 761105,
        },
        {
          postOffice: "Pottalmpur B.O",
          pinCode: 61026,
        },
        {
          postOffice: "Pratapur B.O",
          pinCode: 761119,
        },
        {
          postOffice: "Pratapur S.O (Ganjam)",
          pinCode: 761019,
        },
        {
          postOffice: "Premnagar S.O (Ganjam)",
          pinCode: 760002,
        },
        {
          postOffice: "Pudamari S.O",
          pinCode: 761014,
        },
        {
          postOffice: "Puhundi B.O",
          pinCode: 761209,
        },
        {
          postOffice: "Puruna Berhampur B.O",
          pinCode: 760002,
        },
        {
          postOffice: "Purushottampur Nbs B.O",
          pinCode: 761018,
        },
        {
          postOffice: "Purushottampur S.O",
          pinCode: 761018,
        },
        {
          postOffice: "Pustapur B.O",
          pinCode: 761031,
        },
        {
          postOffice: "Putiapadar B.O",
          pinCode: 761102,
        },
        {
          postOffice: "R.Suvani B.O",
          pinCode: 761009,
        },
        {
          postOffice: "Raghunath Nagar S.O (Ganjam)",
          pinCode: 761110,
        },
        {
          postOffice: "Rai Bandha B.O",
          pinCode: 761109,
        },
        {
          postOffice: "Raijhola B.O",
          pinCode: 761100,
        },
        {
          postOffice: "Rajpur B.O",
          pinCode: 761020,
        },
        {
          postOffice: "Ralaba B.O",
          pinCode: 761102,
        },
        {
          postOffice: "Rama Sanarayanpur B.O",
          pinCode: 761041,
        },
        {
          postOffice: "Ramachandrapur B.O",
          pinCode: 761103,
        },
        {
          postOffice: "Ramanabadi B.O",
          pinCode: 761151,
        },
        {
          postOffice: "Rambha S.O",
          pinCode: 761028,
        },
        {
          postOffice: "Ramchandrapur B.O",
          pinCode: 761010,
        },
        {
          postOffice: "Rampa B.O",
          pinCode: 761010,
        },
        {
          postOffice: "Ranaba B.O",
          pinCode: 761108,
        },
        {
          postOffice: "Ranajhali B.O",
          pinCode: 761018,
        },
        {
          postOffice: "Rangailunda B.O",
          pinCode: 760007,
        },
        {
          postOffice: "Rangipur B.O",
          pinCode: 760003,
        },
        {
          postOffice: "Ratnapur B.O",
          pinCode: 761108,
        },
        {
          postOffice: "Rauti B.O",
          pinCode: 761121,
        },
        {
          postOffice: "Rondha B.O",
          pinCode: 761008,
        },
        {
          postOffice: "Rudhapadar B.O",
          pinCode: 761131,
        },
        {
          postOffice: "Rugumu B.O",
          pinCode: 761107,
        },
        {
          postOffice: "Rukunigam B.O",
          pinCode: 761026,
        },
        {
          postOffice: "Rumagada B.O",
          pinCode: 761117,
        },
        {
          postOffice: "S.Ambagam B.O",
          pinCode: 761101,
        },
        {
          postOffice: "S.B.Jagadevpur B.O",
          pinCode: 761209,
        },
        {
          postOffice: "S.B.Pentho B.O",
          pinCode: 761037,
        },
        {
          postOffice: "S.Gopalpur B.O",
          pinCode: 761106,
        },
        {
          postOffice: "Saba B.O",
          pinCode: 761107,
        },
        {
          postOffice: "Sabulia B.O",
          pinCode: 761028,
        },
        {
          postOffice: "Sahadev Tikirapada B.O",
          pinCode: 761055,
        },
        {
          postOffice: "Sahapur B.O",
          pinCode: 761003,
        },
        {
          postOffice: "Sahaspur B.O",
          pinCode: 761012,
        },
        {
          postOffice: "Sahaspur B.O",
          pinCode: 761115,
        },
        {
          postOffice: "Samantiapalli B.O",
          pinCode: 761004,
        },
        {
          postOffice: "Samarbandha B.O",
          pinCode: 761121,
        },
        {
          postOffice: "Samarjhola B.O",
          pinCode: 761101,
        },
        {
          postOffice: "Sanakodanda B.O",
          pinCode: 761125,
        },
        {
          postOffice: "Sandhamula B.O",
          pinCode: 761035,
        },
        {
          postOffice: "Sandhikendu B.O",
          pinCode: 761109,
        },
        {
          postOffice: "Sankarapur S.O",
          pinCode: 760006,
        },
        {
          postOffice: "Sankuda B.O",
          pinCode: 761035,
        },
        {
          postOffice: "Sankuru B.O",
          pinCode: 761118,
        },
        {
          postOffice: "Santoshpur B.O",
          pinCode: 761004,
        },
        {
          postOffice: "Santoshpur B.O",
          pinCode: 761027,
        },
        {
          postOffice: "Sapuapalli B.O",
          pinCode: 761101,
        },
        {
          postOffice: "Sarabadi B.O",
          pinCode: 761108,
        },
        {
          postOffice: "Sarabhimpur B.O",
          pinCode: 761026,
        },
        {
          postOffice: "Saru B.O",
          pinCode: 761101,
        },
        {
          postOffice: "Sasanapadar B.O",
          pinCode: 761008,
        },
        {
          postOffice: "Satapahandia B.O",
          pinCode: 761100,
        },
        {
          postOffice: "Saurachachina B.O",
          pinCode: 761031,
        },
        {
          postOffice: "Seragada S.O",
          pinCode: 761106,
        },
        {
          postOffice: "Shiala B.O",
          pinCode: 761008,
        },
        {
          postOffice: "Sialia B.O",
          pinCode: 761104,
        },
        {
          postOffice: "Sidhanoi B.O",
          pinCode: 761116,
        },
        {
          postOffice: "Sidhapur B.O",
          pinCode: 761109,
        },
        {
          postOffice: "Sidheswara B.O",
          pinCode: 761054,
        },
        {
          postOffice: "Sikiri B.O",
          pinCode: 761102,
        },
        {
          postOffice: "Sikula B.O",
          pinCode: 761018,
        },
        {
          postOffice: "Sindurapur B.O",
          pinCode: 761020,
        },
        {
          postOffice: "Sitarampalli S.O",
          pinCode: 761020,
        },
        {
          postOffice: "Sodak B.O",
          pinCode: 761118,
        },
        {
          postOffice: "Soma B.O",
          pinCode: 761018,
        },
        {
          postOffice: "Sonepur B.O",
          pinCode: 761009,
        },
        {
          postOffice: "Sorisbilli B.O",
          pinCode: 761108,
        },
        {
          postOffice: "Sriram Nagar S.O",
          pinCode: 760002,
        },
        {
          postOffice: "Sriramchandrapur B.O",
          pinCode: 761020,
        },
        {
          postOffice: "Suanakhala B.O",
          pinCode: 761005,
        },
        {
          postOffice: "Subalaya B.O",
          pinCode: 761111,
        },
        {
          postOffice: "Sumandala S.O",
          pinCode: 761035,
        },
        {
          postOffice: "Sunadei B.O",
          pinCode: 761008,
        },
        {
          postOffice: "Sunambo Street S.O",
          pinCode: 761110,
        },
        {
          postOffice: "Sunapalli B.O",
          pinCode: 761104,
        },
        {
          postOffice: "Sunareddy B.O",
          pinCode: 761005,
        },
        {
          postOffice: "Sunathara B.O",
          pinCode: 761003,
        },
        {
          postOffice: "Surada Bazar B.O",
          pinCode: 761108,
        },
        {
          postOffice: "Surada S.O",
          pinCode: 761108,
        },
        {
          postOffice: "Surala B.O",
          pinCode: 761009,
        },
        {
          postOffice: "Suramani B.O",
          pinCode: 761107,
        },
        {
          postOffice: "Surangi S.O",
          pinCode: 761037,
        },
        {
          postOffice: "Syamsundarpur B.O",
          pinCode: 761030,
        },
        {
          postOffice: "T.O.Road S.O",
          pinCode: 761110,
        },
        {
          postOffice: "Takarada B.O",
          pinCode: 761106,
        },
        {
          postOffice: "Takarada B.O",
          pinCode: 761143,
        },
        {
          postOffice: "Talapada B.O",
          pinCode: 761209,
        },
        {
          postOffice: "Talapada B.O",
          pinCode: 761030,
        },
        {
          postOffice: "Talasara B.O",
          pinCode: 761035,
        },
        {
          postOffice: "Talasingi B.O",
          pinCode: 761007,
        },
        {
          postOffice: "Tanarada S.O",
          pinCode: 761140,
        },
        {
          postOffice: "Tandipur B.O",
          pinCode: 761037,
        },
        {
          postOffice: "Tanganapalli B.O",
          pinCode: 761003,
        },
        {
          postOffice: "Tanhara B.O",
          pinCode: 761103,
        },
        {
          postOffice: "Tankachhai B.O",
          pinCode: 761103,
        },
        {
          postOffice: "Tarasinghi B.O",
          pinCode: 761131,
        },
        {
          postOffice: "Taratrini Hills B.O",
          pinCode: 761018,
        },
        {
          postOffice: "Tentulia B.O",
          pinCode: 761105,
        },
        {
          postOffice: "Tentuliapalli B.O",
          pinCode: 761029,
        },
        {
          postOffice: "Tholadi B.O",
          pinCode: 761131,
        },
        {
          postOffice: "Thuruburai B.O",
          pinCode: 761146,
        },
        {
          postOffice: "Tilisinghi B.O",
          pinCode: 761131,
        },
        {
          postOffice: "Tinigharia B.O",
          pinCode: 761209,
        },
        {
          postOffice: "Tirida B.O",
          pinCode: 761031,
        },
        {
          postOffice: "Totipuram B.O",
          pinCode: 761006,
        },
        {
          postOffice: "Tumbagada B.O",
          pinCode: 761005,
        },
        {
          postOffice: "Turubudi B.O",
          pinCode: 761209,
        },
        {
          postOffice: "Turumu B.O",
          pinCode: 761131,
        },
        {
          postOffice: "U. Dantilingi B.O",
          pinCode: 761151,
        },
        {
          postOffice: "Udhra B.O",
          pinCode: 761119,
        },
        {
          postOffice: "Upalaputti B.O",
          pinCode: 761002,
        },
        {
          postOffice: "Venkataraipur B.O",
          pinCode: 761002,
        },
      ],
      Keonjhar: [
        {
          postOffice: "Akula B.O",
          pinCode: 758076,
        },
        {
          postOffice: "Alati B.O",
          pinCode: 758043,
        },
        {
          postOffice: "Angarua B.O",
          pinCode: 758021,
        },
        {
          postOffice: "Anseikala B.O",
          pinCode: 758047,
        },
        {
          postOffice: "Arsala B.O",
          pinCode: 758031,
        },
        {
          postOffice: "Asanpat B.O",
          pinCode: 758032,
        },
        {
          postOffice: "Atasahi B.O",
          pinCode: 758015,
        },
        {
          postOffice: "Bada Ektali B.O",
          pinCode: 758015,
        },
        {
          postOffice: "Badabaliposi B.O",
          pinCode: 758016,
        },
        {
          postOffice: "Badadumuria B.O",
          pinCode: 758032,
        },
        {
          postOffice: "Badagambharia B.O",
          pinCode: 758017,
        },
        {
          postOffice: "Badajamposi B.O",
          pinCode: 758027,
        },
        {
          postOffice: "Badanai B.O",
          pinCode: 758044,
        },
        {
          postOffice: "Badaneuli B.O",
          pinCode: 758032,
        },
        {
          postOffice: "Badanuagaon B.O",
          pinCode: 758028,
        },
        {
          postOffice: "Badapadana B.O",
          pinCode: 758021,
        },
        {
          postOffice: "Badapichhula B.O",
          pinCode: 758079,
        },
        {
          postOffice: "Badaposi B.O",
          pinCode: 758014,
        },
        {
          postOffice: "Badarampas B.O",
          pinCode: 758083,
        },
        {
          postOffice: "Badasialimal B.O",
          pinCode: 758028,
        },
        {
          postOffice: "Baiganpal B.O",
          pinCode: 758027,
        },
        {
          postOffice: "Baikala B.O",
          pinCode: 758045,
        },
        {
          postOffice: "Bailo B.O",
          pinCode: 758020,
        },
        {
          postOffice: "Balabhadrapur B.O",
          pinCode: 758079,
        },
        {
          postOffice: "Balabhadrapur B.O",
          pinCode: 758047,
        },
        {
          postOffice: "Balabhadrapur B.O",
          pinCode: 758076,
        },
        {
          postOffice: "Balada B.O",
          pinCode: 758034,
        },
        {
          postOffice: "Baladuan B.O",
          pinCode: 758021,
        },
        {
          postOffice: "Balaguda B.O",
          pinCode: 758037,
        },
        {
          postOffice: "Balarampur B.O",
          pinCode: 758025,
        },
        {
          postOffice: "Balibandha B.O",
          pinCode: 758031,
        },
        {
          postOffice: "Balibarei B.O",
          pinCode: 758023,
        },
        {
          postOffice: "Balibaruan B.O",
          pinCode: 755019,
        },
        {
          postOffice: "Balipal B.O",
          pinCode: 758025,
        },
        {
          postOffice: "Baliparbata B.O",
          pinCode: 758026,
        },
        {
          postOffice: "Balipokhari B.O",
          pinCode: 758027,
        },
        {
          postOffice: "Bamebari B.O",
          pinCode: 758034,
        },
        {
          postOffice: "Banabir B.O",
          pinCode: 758081,
        },
        {
          postOffice: "Bancho B.O",
          pinCode: 758022,
        },
        {
          postOffice: "Bandakanda Haladharpur B.O",
          pinCode: 758027,
        },
        {
          postOffice: "Baneikela S.O",
          pinCode: 758038,
        },
        {
          postOffice: "Bangore B.O",
          pinCode: 758023,
        },
        {
          postOffice: "Bankhidi B.O",
          pinCode: 758021,
        },
        {
          postOffice: "Bankia B.O",
          pinCode: 758044,
        },
        {
          postOffice: "Bansapal B.O",
          pinCode: 758018,
        },
        {
          postOffice: "Bansapani B.O",
          pinCode: 758034,
        },
        {
          postOffice: "Baragoda B.O",
          pinCode: 758018,
        },
        {
          postOffice: "Barahatipura B.O",
          pinCode: 758027,
        },
        {
          postOffice: "Baratania B.O",
          pinCode: 758016,
        },
        {
          postOffice: "Barbil S.O",
          pinCode: 758035,
        },
        {
          postOffice: "Barhagarh B.O",
          pinCode: 758018,
        },
        {
          postOffice: "Baria B.O",
          pinCode: 758032,
        },
        {
          postOffice: "Barigaon B.O",
          pinCode: 758078,
        },
        {
          postOffice: "Baripal B.O",
          pinCode: 758025,
        },
        {
          postOffice: "Basantapur B.O",
          pinCode: 758014,
        },
        {
          postOffice: "Basantapur B.O",
          pinCode: 758034,
        },
        {
          postOffice: "Basira B.O",
          pinCode: 758047,
        },
        {
          postOffice: "Basudevpur B.O",
          pinCode: 758047,
        },
        {
          postOffice: "Batto B.O",
          pinCode: 758043,
        },
        {
          postOffice: "Baunsagarh B.O",
          pinCode: 758021,
        },
        {
          postOffice: "Baunsuli B.O",
          pinCode: 758032,
        },
        {
          postOffice: "Bauripada B.O",
          pinCode: 758013,
        },
        {
          postOffice: "Baxibarigaon B.O",
          pinCode: 758079,
        },
        {
          postOffice: "Bayakumutia B.O",
          pinCode: 758018,
        },
        {
          postOffice: "Begna B.O",
          pinCode: 758016,
        },
        {
          postOffice: "Belabahali B.O",
          pinCode: 758020,
        },
        {
          postOffice: "Belda B.O",
          pinCode: 758034,
        },
        {
          postOffice: "Bhadrasahi B.O",
          pinCode: 758035,
        },
        {
          postOffice: "Bhagamunda S.O",
          pinCode: 758080,
        },
        {
          postOffice: "Bhaganai B.O",
          pinCode: 758043,
        },
        {
          postOffice: "Bhaluka B.O",
          pinCode: 758043,
        },
        {
          postOffice: "Bhanda B.O",
          pinCode: 758044,
        },
        {
          postOffice: "Bhandaridiha B.O",
          pinCode: 758025,
        },
        {
          postOffice: "Bhawanarpur B.O",
          pinCode: 758028,
        },
        {
          postOffice: "Bhimkand B.O",
          pinCode: 758076,
        },
        {
          postOffice: "Bhodaposi B.O",
          pinCode: 758032,
        },
        {
          postOffice: "Bholabeda B.O",
          pinCode: 758029,
        },
        {
          postOffice: "Bholapada B.O",
          pinCode: 758016,
        },
        {
          postOffice: "Bhuinpur B.O",
          pinCode: 758032,
        },
        {
          postOffice: "Bhulda B.O",
          pinCode: 758032,
        },
        {
          postOffice: "Bhuyanroida B.O",
          pinCode: 758035,
        },
        {
          postOffice: "Bichakundi B.O",
          pinCode: 758034,
        },
        {
          postOffice: "Bidyadharpur B.O",
          pinCode: 758078,
        },
        {
          postOffice: "Bileipada B.O",
          pinCode: 758038,
        },
        {
          postOffice: "Billa B.O",
          pinCode: 758080,
        },
        {
          postOffice: "Bimala B.O",
          pinCode: 758076,
        },
        {
          postOffice: "Binida B.O",
          pinCode: 758014,
        },
        {
          postOffice: "Binjabahal B.O",
          pinCode: 758019,
        },
        {
          postOffice: "Birabarpur Nuagaon B.O",
          pinCode: 758076,
        },
        {
          postOffice: "Biragovindapur B.O",
          pinCode: 758015,
        },
        {
          postOffice: "Birakishorepur B.O",
          pinCode: 758013,
        },
        {
          postOffice: "Biridi B.O",
          pinCode: 758022,
        },
        {
          postOffice: "Birikala B.O",
          pinCode: 758038,
        },
        {
          postOffice: "Bodapalasa B.O",
          pinCode: 758002,
        },
        {
          postOffice: "Bolani S.O",
          pinCode: 758037,
        },
        {
          postOffice: "Bolaniposi B.O",
          pinCode: 758014,
        },
        {
          postOffice: "Brahmanideo B.O",
          pinCode: 758030,
        },
        {
          postOffice: "Brahmanipal S.O",
          pinCode: 758082,
        },
        {
          postOffice: "Budhikapudi B.O",
          pinCode: 758046,
        },
        {
          postOffice: "Chakradharpur B.O",
          pinCode: 758028,
        },
        {
          postOffice: "Chakundapal B.O",
          pinCode: 758017,
        },
        {
          postOffice: "Chamakpur B.O",
          pinCode: 758041,
        },
        {
          postOffice: "Champei B.O",
          pinCode: 758018,
        },
        {
          postOffice: "Champua S.O",
          pinCode: 758041,
        },
        {
          postOffice: "Chauthia B.O",
          pinCode: 758044,
        },
        {
          postOffice: "Chemena B.O",
          pinCode: 758046,
        },
        {
          postOffice: "Chhamunda B.O",
          pinCode: 758019,
        },
        {
          postOffice: "Chhenapadi B.O",
          pinCode: 758083,
        },
        {
          postOffice: "Childa B.O",
          pinCode: 758046,
        },
        {
          postOffice: "Chilikdhara B.O",
          pinCode: 758080,
        },
        {
          postOffice: "Chinamaliposi B.O",
          pinCode: 758029,
        },
        {
          postOffice: "Chipinda B.O",
          pinCode: 758031,
        },
        {
          postOffice: "Chormalda B.O",
          pinCode: 758034,
        },
        {
          postOffice: "Dabuna B.O",
          pinCode: 758034,
        },
        {
          postOffice: "Daduan B.O",
          pinCode: 758038,
        },
        {
          postOffice: "Damahuda B.O",
          pinCode: 758081,
        },
        {
          postOffice: "Danar B.O",
          pinCode: 756121,
        },
        {
          postOffice: "Daradipal B.O",
          pinCode: 758025,
        },
        {
          postOffice: "Deojhar B.O",
          pinCode: 758038,
        },
        {
          postOffice: "Deoladiha B.O",
          pinCode: 758019,
        },
        {
          postOffice: "Dhakotha B.O",
          pinCode: 758015,
        },
        {
          postOffice: "Dhangadadiha B.O",
          pinCode: 758027,
        },
        {
          postOffice: "Dhanurjaypur Haramatha B.O",
          pinCode: 758040,
        },
        {
          postOffice: "Dhanurnjaypur S.O",
          pinCode: 758078,
        },
        {
          postOffice: "Dhenka B.O",
          pinCode: 758023,
        },
        {
          postOffice: "Dhenkikote S.O",
          pinCode: 758029,
        },
        {
          postOffice: "Dhobakuchuda B.O",
          pinCode: 758041,
        },
        {
          postOffice: "Dhrupada B.O",
          pinCode: 758013,
        },
        {
          postOffice: "Digiposi B.O",
          pinCode: 758016,
        },
        {
          postOffice: "Dimba B.O",
          pinCode: 758014,
        },
        {
          postOffice: "Dimiria B.O",
          pinCode: 756121,
        },
        {
          postOffice: "Dimirimunda B.O",
          pinCode: 758014,
        },
        {
          postOffice: "Doblapal B.O",
          pinCode: 758019,
        },
        {
          postOffice: "Dumuria B.O",
          pinCode: 758030,
        },
        {
          postOffice: "Erendei B.O",
          pinCode: 758030,
        },
        {
          postOffice: "Fakirpur S.O",
          pinCode: 758022,
        },
        {
          postOffice: "Fuljhar B.O",
          pinCode: 758018,
        },
        {
          postOffice: "Gadadharpur B.O",
          pinCode: 758027,
        },
        {
          postOffice: "Gandadiha B.O",
          pinCode: 758028,
        },
        {
          postOffice: "Garabandagoda B.O",
          pinCode: 758043,
        },
        {
          postOffice: "Gayalamunda B.O",
          pinCode: 758021,
        },
        {
          postOffice: "Gedma B.O",
          pinCode: 756121,
        },
        {
          postOffice: "Ghasipura S.O",
          pinCode: 758015,
        },
        {
          postOffice: "Ghatagaon S.O",
          pinCode: 758027,
        },
        {
          postOffice: "Gholkunda B.O",
          pinCode: 758081,
        },
        {
          postOffice: "Ghutur B.O",
          pinCode: 758002,
        },
        {
          postOffice: "Gidhibas B.O",
          pinCode: 758032,
        },
        {
          postOffice: "Girigaon B.O",
          pinCode: 758022,
        },
        {
          postOffice: "Gobarbeda B.O",
          pinCode: 758030,
        },
        {
          postOffice: "Gobardhan B.O",
          pinCode: 758013,
        },
        {
          postOffice: "Goda B.O",
          pinCode: 758019,
        },
        {
          postOffice: "Gohira B.O",
          pinCode: 758015,
        },
        {
          postOffice: "Goras B.O",
          pinCode: 758081,
        },
        {
          postOffice: "Guali B.O",
          pinCode: 758035,
        },
        {
          postOffice: "Gujitangiri B.O",
          pinCode: 758016,
        },
        {
          postOffice: "Gumura B.O",
          pinCode: 758047,
        },
        {
          postOffice: "Gundunia B.O",
          pinCode: 758044,
        },
        {
          postOffice: "Guptaganga B.O",
          pinCode: 758018,
        },
        {
          postOffice: "Guruda B.O",
          pinCode: 758034,
        },
        {
          postOffice: "Gurutuan B.O",
          pinCode: 758034,
        },
        {
          postOffice: "Hadagarh S.O",
          pinCode: 758023,
        },
        {
          postOffice: "Haladharpur B.O",
          pinCode: 758014,
        },
        {
          postOffice: "Handibhanga B.O",
          pinCode: 758031,
        },
        {
          postOffice: "Harichandanpur S.O",
          pinCode: 758028,
        },
        {
          postOffice: "Hatadihi S.O",
          pinCode: 758083,
        },
        {
          postOffice: "Hunda B.O",
          pinCode: 758079,
        },
        {
          postOffice: "Hundapalasapal B.O",
          pinCode: 758028,
        },
        {
          postOffice: "Inchola B.O",
          pinCode: 758083,
        },
        {
          postOffice: "Jadichatar B.O",
          pinCode: 758017,
        },
        {
          postOffice: "Jagamohanpur S.O",
          pinCode: 758054,
        },
        {
          postOffice: "Jagannathpur Ashram B.O",
          pinCode: 758041,
        },
        {
          postOffice: "Jajanga B.O",
          pinCode: 758034,
        },
        {
          postOffice: "Jalasuan B.O",
          pinCode: 758043,
        },
        {
          postOffice: "Jalasuanpatna B.O",
          pinCode: 758025,
        },
        {
          postOffice: "Jally B.O",
          pinCode: 758032,
        },
        {
          postOffice: "Jamadalak B.O",
          pinCode: 758041,
        },
        {
          postOffice: "Jambhira B.O",
          pinCode: 758022,
        },
        {
          postOffice: "Jamuda B.O",
          pinCode: 758045,
        },
        {
          postOffice: "Jamunaposi B.O",
          pinCode: 758017,
        },
        {
          postOffice: "Janghira S.O",
          pinCode: 758079,
        },
        {
          postOffice: "Jata B.O",
          pinCode: 758019,
        },
        {
          postOffice: "Jatra B.O",
          pinCode: 758018,
        },
        {
          postOffice: "Jharbeda B.O",
          pinCode: 758014,
        },
        {
          postOffice: "Jhumpura S.O",
          pinCode: 758031,
        },
        {
          postOffice: "Jiranga B.O",
          pinCode: 758028,
        },
        {
          postOffice: "Joda Bazar S.O",
          pinCode: 758034,
        },
        {
          postOffice: "Joda S.O",
          pinCode: 758034,
        },
        {
          postOffice: "Junga B.O",
          pinCode: 758079,
        },
        {
          postOffice: "Jyotipur B.O",
          pinCode: 758046,
        },
        {
          postOffice: "Kadagarh B.O",
          pinCode: 758013,
        },
        {
          postOffice: "Kadakala B.O",
          pinCode: 758018,
        },
        {
          postOffice: "Kaduadiha B.O",
          pinCode: 758028,
        },
        {
          postOffice: "Kahaliagadia B.O",
          pinCode: 758078,
        },
        {
          postOffice: "Kainta B.O",
          pinCode: 758041,
        },
        {
          postOffice: "Kaliahota B.O",
          pinCode: 758076,
        },
        {
          postOffice: "Kalikaprasad B.O",
          pinCode: 758047,
        },
        {
          postOffice: "Kalinga B.O",
          pinCode: 758044,
        },
        {
          postOffice: "Kandra B.O",
          pinCode: 758047,
        },
        {
          postOffice: "Kandraposi B.O",
          pinCode: 758031,
        },
        {
          postOffice: "Kanjiasula B.O",
          pinCode: 758044,
        },
        {
          postOffice: "Kanjipani B.O",
          pinCode: 758031,
        },
        {
          postOffice: "Kanjipani B.O",
          pinCode: 758018,
        },
        {
          postOffice: "Kankada B.O",
          pinCode: 758046,
        },
        {
          postOffice: "Kanpur B.O",
          pinCode: 758078,
        },
        {
          postOffice: "Kanpur B.O",
          pinCode: 758025,
        },
        {
          postOffice: "Kansa B.O",
          pinCode: 758082,
        },
        {
          postOffice: "Kantiapada B.O",
          pinCode: 758017,
        },
        {
          postOffice: "Kantipal B.O",
          pinCode: 758021,
        },
        {
          postOffice: "Kanto B.O",
          pinCode: 758015,
        },
        {
          postOffice: "Kapundi B.O",
          pinCode: 758016,
        },
        {
          postOffice: "Karadangi B.O",
          pinCode: 758019,
        },
        {
          postOffice: "Karadapal B.O",
          pinCode: 758080,
        },
        {
          postOffice: "Karagola B.O",
          pinCode: 758022,
        },
        {
          postOffice: "Karamangi B.O",
          pinCode: 758076,
        },
        {
          postOffice: "Karangadihi B.O",
          pinCode: 758018,
        },
        {
          postOffice: "Karanjia S.O (Kendujhar)",
          pinCode: 758044,
        },
        {
          postOffice: "Kasia(KA) B.O",
          pinCode: 758035,
        },
        {
          postOffice: "Kasipal B.O",
          pinCode: 758031,
        },
        {
          postOffice: "Kasipal B.O",
          pinCode: 758044,
        },
        {
          postOffice: "Kathabari B.O",
          pinCode: 758029,
        },
        {
          postOffice: "Kathabaunsuli B.O",
          pinCode: 758031,
        },
        {
          postOffice: "Kathakata B.O",
          pinCode: 758021,
        },
        {
          postOffice: "Katrabeda B.O",
          pinCode: 758029,
        },
        {
          postOffice: "Kaunrikala(A) B.O",
          pinCode: 758032,
        },
        {
          postOffice: "Kaunrikala(B) B.O",
          pinCode: 758031,
        },
        {
          postOffice: "Kempasada B.O",
          pinCode: 758013,
        },
        {
          postOffice: "Kendeiposi B.O",
          pinCode: 758017,
        },
        {
          postOffice: "Kendudiha B.O",
          pinCode: 758027,
        },
        {
          postOffice: "Kendukhunta B.O",
          pinCode: 758043,
        },
        {
          postOffice: "Keonjhar Atopur S.O",
          pinCode: 758002,
        },
        {
          postOffice: "Keonjhar Bazar S.O",
          pinCode: 758002,
        },
        {
          postOffice: "Keonjhar Court S.O",
          pinCode: 758001,
        },
        {
          postOffice: "Keonjhar Mining School S.O",
          pinCode: 758001,
        },
        {
          postOffice: "Keonjhar New Markt S.O",
          pinCode: 758001,
        },
        {
          postOffice: "Keonjhar Science College S.O",
          pinCode: 758001,
        },
        {
          postOffice: "Keonjhargarh H.O",
          pinCode: 758001,
        },
        {
          postOffice: "Keshudurapal B.O",
          pinCode: 758025,
        },
        {
          postOffice: "Ketanga B.O",
          pinCode: 758029,
        },
        {
          postOffice: "Khadikapada B.O",
          pinCode: 758081,
        },
        {
          postOffice: "Khajirapat B.O",
          pinCode: 758045,
        },
        {
          postOffice: "Khajuribani B.O",
          pinCode: 758079,
        },
        {
          postOffice: "Khalana B.O",
          pinCode: 758043,
        },
        {
          postOffice: "Khalapal B.O",
          pinCode: 758025,
        },
        {
          postOffice: "Khaliamenta B.O",
          pinCode: 758015,
        },
        {
          postOffice: "Khandabandha B.O",
          pinCode: 758034,
        },
        {
          postOffice: "Khenda B.O",
          pinCode: 758031,
        },
        {
          postOffice: "Khireitangiri B.O",
          pinCode: 758046,
        },
        {
          postOffice: "Khuntapada B.O",
          pinCode: 758031,
        },
        {
          postOffice: "Khuntapada B.O",
          pinCode: 758045,
        },
        {
          postOffice: "Khuntapada Charigarh B.O",
          pinCode: 758019,
        },
        {
          postOffice: "Khuntapingu B.O",
          pinCode: 758045,
        },
        {
          postOffice: "Kiriburu Hill Top S.O",
          pinCode: 758040,
        },
        {
          postOffice: "Kodagadia B.O",
          pinCode: 758041,
        },
        {
          postOffice: "Kodapada B.O",
          pinCode: 758021,
        },
        {
          postOffice: "Kolahundula B.O",
          pinCode: 758038,
        },
        {
          postOffice: "Kolhabarapada B.O",
          pinCode: 758036,
        },
        {
          postOffice: "Kolimati B.O",
          pinCode: 758015,
        },
        {
          postOffice: "Kuanr B.O",
          pinCode: 758018,
        },
        {
          postOffice: "Kuchanendi B.O",
          pinCode: 758025,
        },
        {
          postOffice: "Kudipasa B.O",
          pinCode: 758014,
        },
        {
          postOffice: "Kumundi (KHA) B.O",
          pinCode: 758018,
        },
        {
          postOffice: "Kundapitha B.O",
          pinCode: 758027,
        },
        {
          postOffice: "Kuntla B.O",
          pinCode: 758028,
        },
        {
          postOffice: "Kushakala B.O",
          pinCode: 758018,
        },
        {
          postOffice: "Kushaleswar S.O",
          pinCode: 758025,
        },
        {
          postOffice: "Kusuminta B.O",
          pinCode: 758013,
        },
        {
          postOffice: "Kusunpur B.O",
          pinCode: 758027,
        },
        {
          postOffice: "Machhagarh S.O",
          pinCode: 758081,
        },
        {
          postOffice: "Machhala B.O",
          pinCode: 758043,
        },
        {
          postOffice: "Madanpur B.O",
          pinCode: 758043,
        },
        {
          postOffice: "Madhapur S.O",
          pinCode: 758001,
        },
        {
          postOffice: "Madhukeshari B.O",
          pinCode: 758043,
        },
        {
          postOffice: "Mahadeijoda B.O",
          pinCode: 758013,
        },
        {
          postOffice: "Maidankela B.O",
          pinCode: 758014,
        },
        {
          postOffice: "Malapada B.O",
          pinCode: 758045,
        },
        {
          postOffice: "Malda B.O",
          pinCode: 758031,
        },
        {
          postOffice: "Manata B.O",
          pinCode: 758083,
        },
        {
          postOffice: "Mangalpur B.O",
          pinCode: 758081,
        },
        {
          postOffice: "Marasan B.O",
          pinCode: 758022,
        },
        {
          postOffice: "Margomunda B.O",
          pinCode: 758016,
        },
        {
          postOffice: "Maruthia B.O",
          pinCode: 758014,
        },
        {
          postOffice: "Maruani B.O",
          pinCode: 758021,
        },
        {
          postOffice: "Masaipal B.O",
          pinCode: 758046,
        },
        {
          postOffice: "Masamunga B.O",
          pinCode: 758018,
        },
        {
          postOffice: "Maugunia B.O",
          pinCode: 758044,
        },
        {
          postOffice: "Merdapal B.O",
          pinCode: 758047,
        },
        {
          postOffice: "Mersabahal B.O",
          pinCode: 758013,
        },
        {
          postOffice: "Messa B.O",
          pinCode: 758021,
        },
        {
          postOffice: "Metakani B.O",
          pinCode: 758014,
        },
        {
          postOffice: "Miangadi B.O",
          pinCode: 758043,
        },
        {
          postOffice: "Mithirikundi B.O",
          pinCode: 758038,
        },
        {
          postOffice: "Mishramala B.O",
          pinCode: 758079,
        },
        {
          postOffice: "Mugupur B.O",
          pinCode: 758022,
        },
        {
          postOffice: "Muktapur B.O",
          pinCode: 758029,
        },
        {
          postOffice: "Mukundapur Patna B.O",
          pinCode: 758027,
        },
        {
          postOffice: "Murusuan B.O",
          pinCode: 758017,
        },
        {
          postOffice: "Mushakhari B.O",
          pinCode: 758030,
        },
        {
          postOffice: "Naduan B.O",
          pinCode: 758015,
        },
        {
          postOffice: "Nahabeda B.O",
          pinCode: 758031,
        },
        {
          postOffice: "Nalada B.O",
          pinCode: 758035,
        },
        {
          postOffice: "Nandabara B.O",
          pinCode: 758043,
        },
        {
          postOffice: "Nandapur B.O",
          pinCode: 758044,
        },
        {
          postOffice: "Naradapur B.O",
          pinCode: 758047,
        },
        {
          postOffice: "Naranpur S.O",
          pinCode: 758014,
        },
        {
          postOffice: "Nayakote B.O",
          pinCode: 758018,
        },
        {
          postOffice: "Nayakrihsnapur B.O",
          pinCode: 758047,
        },
        {
          postOffice: "Nelung B.O",
          pinCode: 758002,
        },
        {
          postOffice: "Nishitnapur B.O",
          pinCode: 758047,
        },
        {
          postOffice: "Niundi B.O",
          pinCode: 758032,
        },
        {
          postOffice: "Nuadihi B.O",
          pinCode: 758019,
        },
        {
          postOffice: "Nuagaon B.O",
          pinCode: 758080,
        },
        {
          postOffice: "Nuagaon B.O",
          pinCode: 758013,
        },
        {
          postOffice: "Nuagaon B.O",
          pinCode: 758076,
        },
        {
          postOffice: "Nuagaon B.O",
          pinCode: 758021,
        },
        {
          postOffice: "Nusuriposi B.O",
          pinCode: 758027,
        },
        {
          postOffice: "Odapada B.O",
          pinCode: 755019,
        },
        {
          postOffice: "Orali B.O",
          pinCode: 758083,
        },
        {
          postOffice: "Oriya B.O",
          pinCode: 758019,
        },
        {
          postOffice: "Padamapur B.O",
          pinCode: 758021,
        },
        {
          postOffice: "Padang B.O",
          pinCode: 758076,
        },
        {
          postOffice: "Padhiaripally B.O",
          pinCode: 758078,
        },
        {
          postOffice: "Padmapur B.O",
          pinCode: 758013,
        },
        {
          postOffice: "Padmapur B.O",
          pinCode: 758044,
        },
        {
          postOffice: "Padua B.O",
          pinCode: 758032,
        },
        {
          postOffice: "Palanghati B.O",
          pinCode: 758029,
        },
        {
          postOffice: "Palasa (KHA) B.O",
          pinCode: 758034,
        },
        {
          postOffice: "Palasapanda B.O",
          pinCode: 758031,
        },
        {
          postOffice: "Panasadiha B.O",
          pinCode: 758021,
        },
        {
          postOffice: "Panchapokharia B.O",
          pinCode: 758041,
        },
        {
          postOffice: "Panchupally B.O",
          pinCode: 758020,
        },
        {
          postOffice: "Pandadar B.O",
          pinCode: 758018,
        },
        {
          postOffice: "Pandapara B.O",
          pinCode: 758014,
        },
        {
          postOffice: "Pandua B.O",
          pinCode: 758043,
        },
        {
          postOffice: "Parajanpur B.O",
          pinCode: 758031,
        },
        {
          postOffice: "Parasala B.O",
          pinCode: 758047,
        },
        {
          postOffice: "Patilo B.O",
          pinCode: 758014,
        },
        {
          postOffice: "Patsura B.O",
          pinCode: 758043,
        },
        {
          postOffice: "Phulkanlei B.O",
          pinCode: 758046,
        },
        {
          postOffice: "Pipilia B.O",
          pinCode: 758029,
        },
        {
          postOffice: "Pitapiti B.O",
          pinCode: 758028,
        },
        {
          postOffice: "Pithagola B.O",
          pinCode: 758028,
        },
        {
          postOffice: "Podasingidi B.O",
          pinCode: 758023,
        },
        {
          postOffice: "Poipani B.O",
          pinCode: 758029,
        },
        {
          postOffice: "Pokharia B.O",
          pinCode: 758044,
        },
        {
          postOffice: "Purujoda B.O",
          pinCode: 758076,
        },
        {
          postOffice: "Purumunda B.O",
          pinCode: 758014,
        },
        {
          postOffice: "Purunabandagoda B.O",
          pinCode: 758043,
        },
        {
          postOffice: "Purunaghati B.O",
          pinCode: 758021,
        },
        {
          postOffice: "Purunia B.O",
          pinCode: 758020,
        },
        {
          postOffice: "Radhikadeipur B.O",
          pinCode: 758025,
        },
        {
          postOffice: "Radhikadeipur B.O",
          pinCode: 758032,
        },
        {
          postOffice: "Raghunathpur B.O",
          pinCode: 758014,
        },
        {
          postOffice: "Raidiha B.O",
          pinCode: 758016,
        },
        {
          postOffice: "Raighati B.O",
          pinCode: 758078,
        },
        {
          postOffice: "Raigoda B.O",
          pinCode: 758018,
        },
        {
          postOffice: "Raikala B.O",
          pinCode: 758031,
        },
        {
          postOffice: "Raisuan Patkhuli B.O",
          pinCode: 758076,
        },
        {
          postOffice: "Raisuan S.O",
          pinCode: 758013,
        },
        {
          postOffice: "Raitola B.O",
          pinCode: 758021,
        },
        {
          postOffice: "Rajabandha B.O",
          pinCode: 758027,
        },
        {
          postOffice: "Rajanagar S.O",
          pinCode: 758017,
        },
        {
          postOffice: "Rajia B.O",
          pinCode: 758047,
        },
        {
          postOffice: "Ramachandrapur B.O",
          pinCode: 758043,
        },
        {
          postOffice: "Rangamatia B.O",
          pinCode: 758044,
        },
        {
          postOffice: "Ranki B.O",
          pinCode: 758002,
        },
        {
          postOffice: "Raruanguda B.O",
          pinCode: 758044,
        },
        {
          postOffice: "Rasabantala B.O",
          pinCode: 758032,
        },
        {
          postOffice: "Remuli S.O",
          pinCode: 758047,
        },
        {
          postOffice: "Rutisila B.O",
          pinCode: 758014,
        },
        {
          postOffice: "Rvenapalasapal B.O",
          pinCode: 758080,
        },
        {
          postOffice: "Sadanga B.O",
          pinCode: 756121,
        },
        {
          postOffice: "Sadangi B.O",
          pinCode: 758046,
        },
        {
          postOffice: "Sadha B.O",
          pinCode: 758023,
        },
        {
          postOffice: "Sagadapata B.O",
          pinCode: 758080,
        },
        {
          postOffice: "Saharpada S.O",
          pinCode: 758016,
        },
        {
          postOffice: "Sailong B.O",
          pinCode: 758015,
        },
        {
          postOffice: "Sainkul S.O",
          pinCode: 758043,
        },
        {
          postOffice: "Salabani B.O",
          pinCode: 758021,
        },
        {
          postOffice: "Salapada S.O",
          pinCode: 758020,
        },
        {
          postOffice: "Saleikana B.O",
          pinCode: 758019,
        },
        {
          postOffice: "Salinia B.O",
          pinCode: 756121,
        },
        {
          postOffice: "Samana B.O",
          pinCode: 758022,
        },
        {
          postOffice: "Samukanendi B.O",
          pinCode: 758025,
        },
        {
          postOffice: "Sanamasinabila B.O",
          pinCode: 758029,
        },
        {
          postOffice: "Sankho B.O",
          pinCode: 758022,
        },
        {
          postOffice: "Sankir B.O",
          pinCode: 758013,
        },
        {
          postOffice: "Santoshpur B.O",
          pinCode: 758015,
        },
        {
          postOffice: "Santrapur B.O",
          pinCode: 758029,
        },
        {
          postOffice: "Sarasinga B.O",
          pinCode: 758032,
        },
        {
          postOffice: "Saraskola B.O",
          pinCode: 758030,
        },
        {
          postOffice: "Sarei B.O",
          pinCode: 758041,
        },
        {
          postOffice: "Saruali B.O",
          pinCode: 758019,
        },
        {
          postOffice: "Sasang B.O",
          pinCode: 758041,
        },
        {
          postOffice: "Sendkap B.O",
          pinCode: 758013,
        },
        {
          postOffice: "Serenda B.O",
          pinCode: 758035,
        },
        {
          postOffice: "Silida B.O",
          pinCode: 758017,
        },
        {
          postOffice: "Silijoda B.O",
          pinCode: 758034,
        },
        {
          postOffice: "Silipada B.O",
          pinCode: 758045,
        },
        {
          postOffice: "Silisuan B.O",
          pinCode: 758031,
        },
        {
          postOffice: "Silitia B.O",
          pinCode: 758032,
        },
        {
          postOffice: "Singpur B.O",
          pinCode: 758018,
        },
        {
          postOffice: "Sirigida S.O",
          pinCode: 758076,
        },
        {
          postOffice: "Sirishpal B.O",
          pinCode: 758014,
        },
        {
          postOffice: "Sologuda B.O",
          pinCode: 758044,
        },
        {
          postOffice: "Somagiri B.O",
          pinCode: 758079,
        },
        {
          postOffice: "Soso B.O",
          pinCode: 758078,
        },
        {
          postOffice: "Suakati S.O",
          pinCode: 758018,
        },
        {
          postOffice: "Sulana B.O",
          pinCode: 758022,
        },
        {
          postOffice: "Sunapentha B.O",
          pinCode: 758028,
        },
        {
          postOffice: "Sunaposi B.O",
          pinCode: 758041,
        },
        {
          postOffice: "Sundara Shiv Mandir S.O",
          pinCode: 758035,
        },
        {
          postOffice: "Sunduria B.O",
          pinCode: 758076,
        },
        {
          postOffice: "Swampatna S.O",
          pinCode: 758030,
        },
        {
          postOffice: "Taduabahal B.O",
          pinCode: 758047,
        },
        {
          postOffice: "Talapada B.O",
          pinCode: 758019,
        },
        {
          postOffice: "Talapada S.O",
          pinCode: 758026,
        },
        {
          postOffice: "Tambahara B.O",
          pinCode: 758028,
        },
        {
          postOffice: "Tana B.O",
          pinCode: 758019,
        },
        {
          postOffice: "Tanda B.O",
          pinCode: 758016,
        },
        {
          postOffice: "Taneipal B.O",
          pinCode: 758021,
        },
        {
          postOffice: "Tangarpada B.O",
          pinCode: 758030,
        },
        {
          postOffice: "Tangiriapal B.O",
          pinCode: 758082,
        },
        {
          postOffice: "Tara B.O",
          pinCode: 758027,
        },
        {
          postOffice: "Taramakanta B.O",
          pinCode: 758018,
        },
        {
          postOffice: "Taratara B.O",
          pinCode: 758021,
        },
        {
          postOffice: "Tarimul B.O",
          pinCode: 758025,
        },
        {
          postOffice: "Taruan B.O",
          pinCode: 758043,
        },
        {
          postOffice: "Tavasarua B.O",
          pinCode: 758016,
        },
        {
          postOffice: "Telkoi S.O",
          pinCode: 758019,
        },
        {
          postOffice: "Tendra B.O",
          pinCode: 758016,
        },
        {
          postOffice: "Tentlaposi B.O",
          pinCode: 758079,
        },
        {
          postOffice: "Thakurani B.O",
          pinCode: 758035,
        },
        {
          postOffice: "Thakurapada B.O",
          pinCode: 758028,
        },
        {
          postOffice: "Tikarpada B.O",
          pinCode: 758013,
        },
        {
          postOffice: "Tolankapada B.O",
          pinCode: 758020,
        },
        {
          postOffice: "Toraniapal B.O",
          pinCode: 758025,
        },
        {
          postOffice: "Toranipokhari B.O",
          pinCode: 758029,
        },
        {
          postOffice: "Trilochanpur B.O",
          pinCode: 758015,
        },
        {
          postOffice: "Tukudiha B.O",
          pinCode: 758032,
        },
        {
          postOffice: "Tukuna B.O",
          pinCode: 758020,
        },
        {
          postOffice: "Turumunga S.O",
          pinCode: 758046,
        },
        {
          postOffice: "Uchhabali B.O",
          pinCode: 758044,
        },
        {
          postOffice: "Udayapur S.O",
          pinCode: 758045,
        },
        {
          postOffice: "Ukhunda S.O",
          pinCode: 758032,
        },
        {
          postOffice: "Urumunda B.O",
          pinCode: 758018,
        },
      ],
    },
  ];
  const distData = Odisha[0];
  const po = formData.district;
  const postOff = distData[po];

  const stateData = district[0];
  const state = formData.state;
  const districts = stateData[state];

  useEffect(() => {
    let pinNO;
    postOff &&
      postOff.map((item) => {
        if (formData.postOffice === item.postOffice) {
          pinNO = item.pinCode;
        }
      });
    setFormData({
      ...formData,
      pin: pinNO,
    });
  }, [formData.postOffice]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const savePin = async (e) => {
    e.preventDefault();
    setVoter([]);
    try {
      setClick(true);
      const response = await axios.get(
        `http://localhost:8080/voter/voter/${formData.pin}`
      );
      setVoter(response.data);
    } catch (error) {
      setClick(false);
      alert("Pincode not found!");
      console.error("voterDatabase", error);
    }
  };

  const renderCompanyData = () => {
    return (
      <tr>
        <td colSpan="12" className="text-center">
          <img style={{ margin: "50px 0 50px 0" }} src={DataNotFound} alt="No Data Found"></img>
          <h1>No Data Found!</h1>
          <p>
            It Looks like there is no data to display in this table at the
            moment
          </p>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <HeadDashboard
        navClick={navClick}
        setNavClick={setNavClick}
        side={side}
        setSide={setSide}
      />
      <div className="dashboard-page">
        <Sidebar navClick={navClick} side={side} />
        <div className="dashboard">
          <div className="paper-head-div">
            <p style={{ margin: "0", fontSize: "30px" }}>Voter's Database</p>
            <div>
              <span>Voter's Insights </span> <LiaGreaterThanSolid />{" "}
              <span style={{ color: "#f26522" }}>Voter's Database</span>
            </div>
          </div>
          <div className="paper-head-div">
            <form style={{ width: "100%" }}>
              <div className="data-input-fields">
                <TextField
                  id="state"
                  margin="dense"
                  select
                  label="State"
                  fullWidth
                  defaultValue="Choose"
                  SelectProps={{
                    native: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.state}
                  onChange={(e) => handleInputChange(e)}
                  name="state"
                >
                  {Type.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
                <TextField
                  id="district"
                  margin="dense"
                  select
                  label="District"
                  fullWidth
                  defaultValue="Choose"
                  SelectProps={{
                    native: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.district}
                  onChange={(e) => handleInputChange(e)}
                  name="district"
                >
                  {districts &&
                    districts.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                </TextField>
                <TextField
                  id="postOffice"
                  margin="dense"
                  select
                  label="Post Office"
                  fullWidth
                  defaultValue="Choose"
                  SelectProps={{
                    native: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.postOffice}
                  onChange={(e) => handleInputChange(e)}
                  name="postOffice"
                >
                  {postOff &&
                    postOff.map((option, index) => (
                      <option key={index} value={option.postOffice}>
                        {option.postOffice}
                      </option>
                    ))}
                </TextField>
                <TextField
                  id="pin"
                  margin="dense"
                  type="number"
                  label="Pin Number"
                  fullWidth
                  defaultValue="Choose"
                  SelectProps={{
                    native: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.pin}
                  name="pin"
                  disabled
                />
              </div>
              <div className="data-buttons d-flex justify-content-end">
                <Button
                  id="input-btn-submit"
                  className="submit"
                  type="submit"
                  onClick={(e) => savePin(e)}
                  variant="outlined"
                  style={{width:"max-content", height:"40px"}}
                >
                  Search
                </Button>
              </div>
            </form>
          </div>

          <div className="table-start-container">
            <div style={{ display: "flex", justifyContent: "end" }}>
              <input
                className="table-search"
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <table id="table" className="table table-bordered table-hover">
              <thead>
                <tr className="" style={{ textTransform: "uppercase" }}>
                  <th></th>
                  <th>Name</th>
                  <th>Mobile Number</th>
                  <th>State</th>
                  <th>District</th>
                  <th>Pin Number</th>
                </tr>
              </thead>
              <tbody>
                {voter.length === 0 && click ? (
                  <div style={{position:'absolute', left:"60%", marginTop:"80px"}}>
                  <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="rgba(242, 101, 34, 1)"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                  </div>
                ) : (
                  voter.length===0?renderCompanyData():(rowsPerPage > 0
                  ? voter.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : voter
                )
                    .filter((elem) => {
                      if (search.length === 0) return elem;
                      return (
                        elem.votername
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        elem.mobilenumber.toString().includes(search) ||
                        elem.state
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        elem.district
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        elem.pincode.toString().includes(search)
                      );
                    })
                    .map((data, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{data.votername}</td>
                        <td>{data.mobilenumber}</td>
                        <td>{data.state}</td>
                        <td>{data.district}</td>
                        <td>{data.pincode}</td>
                      </tr>
                    ))
                )}
              </tbody>
              <tfoot>
                <tr>
                <CustomTablePagination
                id="pagingg"
                rowsPerPageOptions={[25, 50, 100, { label: "All", value: -1 }]}
                colSpan={12}
                count={voter.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    "aria-label": "rows per page",
                  },
                  actions: {
                    // showFirstButton: true,
                    // showLastButton: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoterDatabase;
