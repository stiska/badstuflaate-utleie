const model = {
    modal: 'none',
    app: {
        currentPage: 'frontPage',
        currentUser: 'admin',
        currentPicture: 0, // 'img/picture1.jpg',  // src="/badebilde.jpg"
        editorPicture: 0,
        modalContent: '',
    },

    inputs: {

        adminPageBooking: {
            fleetChoice: 0,
            selectedDate: new Date(),
            selectedBooking: null,
        },
        adminPageComfort: {
            // tilgjenlig ekstraprodukter box
            price: 0,
            product: 0,
            // endre priser box
            weekdayPriceDay: 0,
            weekdayPriceHour: 0,
            weekendPriceDay: 0,
            weekendPriceHour: 0,
            // endre pakke box
            selectPackage: 0,
            packageProduct: '',
            weekendPrice: 0,
            weekdayPrice: 0,
            packageName: '',
            selectPackageDropdown: null,
            // legg til pakke box
            newPackageName: '',
            newPackageHour: 0,
            newPackageWeekdayPrice: 0,
            newPackageWeekendPrice: 0,
        },
        loginPage: {
            userName: '',
            password: '',
        },
        newUserPage: {
            name: '',
            adress: '',
            phone: '',
            email: '',
            password: '',
            confirmedPassword: '',
        },
        frontPage: {
        },
        bookingPage: {

            fleetChoice: 0, //setter til 0 stedet for null
            packageChoice: null,
            comfortChoices: [],
            selectedDate: new Date(),
            selectedHours: [],
            isDateSelected: false,//tester aa sette til true

        },
        blogPage: {
            titlePost: '',
            currentPost: '',
        },
    },

    data: { // Husk og fylle ut alle verdier
        users: [
            {
                name: 'admin',
                adress: 'admin adresse',
                phoneNumber: 'admin tlf',
                email: 'admin@mail',
                password: '1234',
            },
            {
                name: 'Petter Nesbo',
                adress: 'Tiurveien 12',
                phoneNumber: '98898899',
                email: 'PetterN@gmail.com',
                password: '1234',
            },
            {
                name: 'Ola Normann',
                adress: 'Ytre Enebakk 12',
                phoneNumber: '98898899',
                email: 'Ola.Normann@gmail.com',
                password: 'Sommer2020',
            },
            {
                name: 'Tina Tveiten',
                adress: 'Hytti Heiti 3',
                phoneNumber: '90609080',
                email: 'Tina.Tveiten@gmail.com',
                password: 'Sommer2020',
            },

        ],
        packageOptions: [
            {
                id: 0,
                name: 'Jentekveld (6 stk)',
                price: {
                    weekdayPrice: 1800,
                    weekendPrice: 3250,
                },
                hours: 7,
                comforts: [
                    { name: 'Snorkel', quantity: 3, },
                    { name: 'Håndklær', quantity: 6, },
                    { name: 'Mineralvann', quantity: 6, },
                    { name: 'Aroma essens', quantity: 1, },
                    { name: 'Solkrem', quantity: 1, },
                ],
            },
          
            {
                id: 2,
                name: 'Familie pakke (4 stk)',
                price: {
                    weekdayPrice: 1904,
                    weekendPrice: 2304,
                },
                hours: 3,
                comforts: [
                    { name: 'Badebukse', quantity: 4, },
                    { name: 'Håndklær', quantity: 4, },
                    { name: 'Mineralvann', quantity: 4, },
                    { name: 'Aroma essens', quantity: 1, },
                    { name: 'Solkrem', quantity: 4, },
                ],
            },
        
            {
                id: 4,
                name: 'Standard pakke (2 stk)',
                price: {
                    weekdayPrice: 1504,
                    weekendPrice: 2304,
                },
                hours: 2,
                comforts: [
                    { name: 'Snorkel', quantity: 1, },
                    { name: 'Badebukse', quantity: 2, },
                    { name: 'Håndklær', quantity: 2, },
                ],

            },
        ],

        comforts: [
            {
                id: 0,
                name: 'Snorkel',
                price: 100,
            },
            {
                id: 1,
                name: 'Badebukse',
                price: 300,
            },
            {
                id: 2,
                name: 'Håndkler',
                price: 150,
            },
            {
                id: 3,
                name: 'Mineralvann',
                price: 50,
            },
            {
                id: 4,
                name: 'Aroma essens',
                price: 120,
            },
            {
                id: 5,
                name: 'Solkrem',
                price: 200,
            },
        ],

        bookings: [
            {
                orderId: 0,
                fleetId: 0,
                chosenPackage: null,
                chosenComforts: [1, 0, 0],
                chosenDate: new Date("2023-03-13"),// string av booket dato
                chosenHours: [9, 10, 11, 12, 13, 14, 15, 16],
                customer: 'Ola Normann',
                totalPrice: 3599,
            },
            {
                orderId: 1,
                fleetId: 0,
                chosenPackage: null,
                chosenComforts: [1, 3, 3, 3],
                chosenDate: new Date("2023-03-14"),// string av booket dato
                chosenHours: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
                customer: 'Petter Nesbo',
                totalPrice: 6599,
            },
            {
                orderId: 2,
                fleetId: 0,
                chosenPackage: null,
                chosenComforts: [1, 4, 4, 4],
                chosenDate: new Date("2023-03-15"),// string av booket dato
                chosenHours: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                customer: 'Tina Tveiten',
                totalPrice: 7500,
            },
        ],
        fleets: [
            {
                id: 0,
                name: 'Skarven',
                img: `<img src="img/fleetskarvenBooking.jpeg" alt="flåte1" width="288" height="162">`,
                border: '#efe2cd',
            },
            {
                id: 1,
                name: 'Måken',
                img: `<img src="img/fleetmakenBooking.jpeg" alt="flåte2" width="288" height="162">`,
                border: '#efe2cd',
            },
        ],

        blogPosts: [
            {
                postId: 0,
                postTitle: 'Forbedre din mentale helse',
                postText: `5 enkle måter å forbedre din mentale helse på": Å forbedre din mentale helse kan være enkle endringer i din daglige rutine, som å få nok søvn, spise sunn mat, bevege deg regelmessig, ta pauser og sosialisere deg med venner og familie.
                "Hvordan takle stress og angst": Stress og angst er vanlige utfordringer som mange opplever. Å takle disse utfordringene kan innebære å bruke avslapningsteknikker som dyp pusting, yoga og meditasjon, eller å søke profesjonell hjelp fra en terapeut.
                "Betydningen av å ta vare på din mentale helse": Din mentale helse er like viktig som din fysiske helse, og det å ta vare på din mentale helse kan ha en positiv innvirkning på livskvaliteten din. Dette kan inkludere å opprettholde sunne relasjoner, sette grenser og ta tid til å gjøre ting du liker.
                "Hvordan håndtere depresjon": Depresjon er en alvorlig tilstand som kan påvirke livet ditt på mange måter. Å håndtere depresjon kan innebære å få profesjonell hjelp fra en terapeut, ta medisiner og endre livsstilen din, som å få nok søvn, spise sunn mat og mosjonere regelmessig.
                "Hvordan støtte noen med en mental helseutfordring": Hvis du kjenner noen som sliter med en mental helseutfordring, kan du hjelpe ved å være støttende, lytte til dem og oppmuntre dem til å søke profesjonell hjelp når det er nødvendig. Du kan også lære deg mer om mental helse og hvordan du kan bidra til å bryte ned stigma rundt temaet.`,
                postPicture: 'img/mentalhealth.jpg',
            },
            {
                postId: 1,
                postTitle: 'Isbading for mental trening',
                postText: `Isbading er en måte å anerkjenne og belønne ferdigheter og prestasjoner på. Det fungerer ved at en person tjener merker, eller "badges", for å fullføre visse oppgaver eller demonstrere bestemte ferdigheter. Disse merkene kan deretter vises på en persons profil eller nettsted som en måte å vise frem deres prestasjoner.
                En av fordelene med isbadging er at det kan gi en mer omfattende og nøyaktig måte å anerkjenne prestasjoner på enn tradisjonelle sertifiseringer eller grader. Isbadging kan være spesifikk for en bestemt ferdighet eller oppgave, og kan også være mer fleksibel og tilpassbar for å imøtekomme individuelle behov og mål.
                Isbadging er også en effektiv måte å øke engasjementet og motivasjonen til deltakerne. Å tjene digitale merker kan være en belønning i seg selv, og det kan også gi en følelse av prestasjon og tilhørighet til en bestemt gruppe eller samfunn.
                Mens isbadging har blitt populært i utdanningssektoren, blir det også brukt i andre bransjer som teknologi, helsevesen og forretningsverdenen. Isbadging kan være spesielt nyttig i karriereutvikling, der det kan gi arbeidsgivere en mer nøyaktig og omfattende måte å evaluere potensielle kandidater på.
                Alt i alt kan isbadging være en verdifull tillegg til tradisjonelle måter å anerkjenne ferdigheter og prestasjoner på. Ved å gi en mer omfattende og tilpassbar måte å belønne deltakelse og prestasjon, kan isbadging hjelpe enkeltpersoner og organisasjoner å nå sine mål og oppnå suksess.`,
                postPicture: 'img/isbading.jpg',
            },
            {
                postId: 2,
                postTitle: 'Sov deg til bedre mental helse',
                postText: `Hvordan få bedre søvn for bedre mental helse": Søvn spiller en viktig rolle i vår mentale helse, og å forbedre søvnkvaliteten kan ha en positiv innvirkning på humør, stressnivå og energinivå i løpet av dagen. Dette kan inkludere å opprettholde en jevn søvnplan, skape et behagelig sovemiljø og redusere bruk av elektroniske enheter før sengetid.
                Unngå koffein og alkohol før sengetid: Koffein og alkohol kan forstyrre søvnmønstre og føre til dårligere søvnkvalitet. Prøv å begrense inntaket av koffein og alkohol, spesielt i timene før sengetid, for å sikre at du får en god natts søvn.
                Prøv avslapningsteknikker: Avslapningsteknikker som yoga, meditasjon eller dyp pusting kan hjelpe deg med å roe ned før sengetid og forbedre søvnkvaliteten. Prøv å inkludere disse teknikkene i din daglige rutine for å redusere stress og angst.
                Vær oppmerksom på skjermtid: Skjermene fra mobiltelefoner, datamaskiner og TV-er kan utsette hjernen for blått lys, som kan forstyrre søvnrytmen. Prøv å redusere skjermtiden din i timene før sengetid, og bruk gjerne nattmodus på enhetene dine for å redusere mengden av blått lys som utsettes for øynene dine.`,
                postPicture: 'img/soving.jpg',
            },
            {
                postId: 3,
                postTitle: 'Trening for mental helse',
                postText: `Reduser stressnivået: Trening kan hjelpe med å redusere stressnivået ved å utløse endorfiner, som er naturlige smertestillende midler i hjernen. Dette kan gi en følelse av velvære og hjelpe deg med å håndtere stress og angst på en mer effektiv måte.
                Forbedre humøret: Trening kan også forbedre humøret ditt ved å øke nivået av serotonin i hjernen din. Serotonin er en kjemisk forbindelse som er knyttet til lykke og velvære, og trening kan bidra til å øke nivået av denne forbindelsen i hjernen.
                Øke selvtilliten: Trening kan bidra til å øke selvtilliten din ved å forbedre kroppsbilde og selvoppfatning. Når du trener, kan du oppleve en følelse av mestring og tilfredshet når du oppnår dine treningsmål, som kan føre til en økning i selvtilliten din.
                Forbedre søvnkvaliteten: Trening kan også hjelpe med å forbedre søvnkvaliteten ved å redusere stressnivået og utmattelse i kroppen. Dette kan hjelpe deg med å sovne raskere og sove dypere gjennom natten, som kan forbedre humøret og energinivået ditt i løpet av dagen.`,
                postPicture: 'img/treningMental.jpg',
            },

        ],

        blogPictures: [
            {
                imageLink: 'img/blogPicture1.jpg',
                editorBorder: '#c7d4bc',
            },
            {
                imageLink: 'img/blogPicture3.jpg',
                editorBorder: '#c7d4bc',
            },
            {
                imageLink: 'img/mentalhealth.jpg',
                editorBorder: '#c7d4bc',
            },
            {
                imageLink: 'img/treningMental.jpg',
                editorBorder: '#c7d4bc',
            },
            {
                imageLink: 'img/soving.jpg',
                editorBorder: '#c7d4bc',
            },
        ],
        frontPagePictures: [
            {
                imageLink: 'img/fleetskarvenFront.jpeg',
                pictureTitle: 'Forside bilde 1',
            },
            {
                imageLink: 'img/fleetmakenFront.jpeg',
                pictureTitle: 'Forside bilde 2',
            },
            {
                imageLink: 'img/larvikinnlop2560x1440.jpeg',
                pictureTitle: 'Forside bilde 3',
            }

        ],

        daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], //funker det å ha denne her?
        hoursInDay: 24,

        prices: {
            weekdayPriceHour: 200,
            weekdayPriceDay: 1800,
            weekendPriceHour: 300,
            weekendPriceDay: 2600,
        },
    },
}
// Hvordan går man frem for og lage en kalender og data modell for det?
// Datafunksjoner for priser i kalender
//
//Hvordan lagre datoer med priser? controller-funksjon som regner ut pris og ser om dag valgt er helg eller ikke?
// 
