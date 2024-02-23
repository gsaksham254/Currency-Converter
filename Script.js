let URL = "https://flagsapi.com/BE/flat/64.png";
        let Base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
        const Dropdowns = document.querySelectorAll(".dropdown select");
        const fromCurrency = document.querySelector(".from select");
        const toCurrency = document.querySelector(".to select");
        const fromFlagImg = document.getElementById("fromFlag");
        const Result = document.querySelector(".toValue");
        const toFlagImg = document.getElementById("toFlag");
        const Button = document.querySelector("button");


        window.addEventListener("load", ()=>{
            updateExchangerate();  
        })

        for(select of Dropdowns){
            for (currcode in countryList){
                let opt = document.createElement("option");
                opt.value = currcode;
                opt.innerText = currcode;
                if(select.name === "from" && currcode === "USD"){
                    opt.selected = "selected";
                }
                else if(select.name === "to" && currcode === "INR"){
                    opt.selected = "selected";
                }
                select.appendChild(opt);
            }
            select.addEventListener("change", (evt)=>{
                updateFlag(evt.target.value, evt.target.name === "from" ? fromFlagImg : toFlagImg); 
            })
        }

        let updateFlag = (currcode, flagImg)=>{
            let countrycode = countryList[currcode];
            let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
            flagImg.src = newSrc;
        }
        Button.addEventListener("click",(evt)=>{
            evt.preventDefault();
            updateExchangerate();
        })

        let updateExchangerate = async ()=>{
            let Amount = document.querySelector("input");
            let amountValue = Amount.value;
            if(amountValue === "" || amountValue < 1){
                amountValue = 1;
                Amount.value = 1;   
            }
            // console.log(fromCurrency.value,toCurrency.value);
            const Url = `${Base_URL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;
            let response = await fetch(Url);
            let data = await response.json();
            let rate = data[toCurrency.value.toLowerCase()];
            console.log(rate);
            let FinalResult = (amountValue * rate).toFixed(2);
            Result.innerText = `${amountValue} ${fromCurrency.value} = ${FinalResult} ${toCurrency.value}`;
        }
