Main();
function Main(inputIndexes) {
    var indexes = [ 1, 1, 1, 1, 1, 1];
    var limiter = 0;
    var stringText = "0123456789ABCDEF";
    GetPossibilities(stringText, indexes, limiter);
}

function GetPossibilities(text,indexes,limiter)
{
    var reached = false;
    var textArray = text;
    var dummy = '';
    var dummy1 = '';
    var preIndexNum = 1;
    while (!reached) {
        for(var i = 0; i < indexes.length; i++)
        {
            var ind = indexes[i] - 1;
            dummy = dummy + textArray[ind];
        }
        for(var i = 0; i < indexes.length; i++)
        {
            var ind1 = Math.abs(indexes[i] - 16);
            dummy1 = dummy1 + textArray[ind1];
        }
        indexes = GetNumberBasedOnTextLength(textArray.length, indexes);
        if (dummy.length > 5) {
            var parent = document.getElementById('parent');
            var newChild = '<div style="background-color:#'+dummy+';color:#'+dummy1+'"><span>#'+dummy+'</span></div>';
            parent.insertAdjacentHTML('beforeend', newChild);
            preIndexNum++;
        }
        if (preIndexNum > 10000){
            break;
        }
           
        if (dummy.length > 6)
            break;
        dummy = '';
        dummy1 = '';
    }
    return preIndexNum;
}

function GetNumberBasedOnTextLength(length, number)
    {
        var digitsList = number;
        digitsList.reverse();
        var digitsArray = digitsList;
        var dummyIntList = [];
        var dummyIntListLength = digitsArray.length + 1;
        for (var i = 0; i < digitsArray.length; i++)
        {
            dummyIntList[i] = digitsArray[i];
        }
        for (var i = 0; i < dummyIntListLength; i++)
        {
            if (dummyIntList[i] < length)
            {
                dummyIntList[i] = dummyIntList[i] + 1;
                break;
            }
            if (dummyIntList[i] == length)
            {
                for (var j = i; j < dummyIntListLength; j++)
                {
                    if (dummyIntList[j] < length)
                    {
                        dummyIntList[j] = dummyIntList[j] + 1;
                        break;
                    }
                    else
                        dummyIntList[j] = 1;
                }
                break;
            }
        }
        var list = dummyIntList;
        list.reverse();
        var list1 = list.filter(notZero);
        return list1;
    }

function notZero(value){
    return value != 0;
}

function GenrateNumber(digitsArray)
{
    var sum = 0;
    for (var i = 0; i < digitsArray.length; i++)
    {
        if (digitsArray[i] == 0)
            continue;
        if (digitsArray[i] <= 9)
            sum = sum * 10 + digitsArray[i];
        else if (digitsArray[i] > 9)
            sum = sum * 10 * 10 + digitsArray[i];
    }
    return sum;
}
function GetDigitsList(number)
{
    var digitsList = [];
    while (number > 0) {
        digitsList.push(number % 10);
        number = number / 10;
    }
    digitsList.reverse();
    return digitsList;
}

function checkReached(preIndexNum,length)
{
    var digitsList = GetDigitsList(preIndexNum);
    if (digitsList.length == length) {
        for(var i = 0; i < digitsList.length; i++)
        {
            if (digitsList[i] < length)
                return false;
        }
        return true;
    }
    else {
        return false;
    }
}