
export default function IPv4_Address( addressDotQuad, netmaskBits ) {
    let split = addressDotQuad.split( '.', 4 );
    let byte1 = Math.max( 0, Math.min( 255, parseInt( split[0], 10 ))); /* sanity check: valid values: = 0-255 */
    let byte2 = Math.max( 0, Math.min( 255, parseInt( split[1], 10 )));
    let byte3 = Math.max( 0, Math.min( 255, parseInt( split[2], 10 )));
    let byte4 = Math.max( 0, Math.min( 255, parseInt( split[3], 10 )));
    if( isNaN( byte1 )) {	byte1 = 0;	}	/* fix NaN situations */
    if( isNaN( byte2 )) {	byte2 = 0;	}
    if( isNaN( byte3 )) {	byte3 = 0;	}
    if( isNaN( byte4 )) {	byte4 = 0;	}
    addressDotQuad = ( byte1 +'.'+ byte2 +'.'+ byte3 +'.'+ byte4 );

    // this.addressDotQuad = addressDotQuad.toString();
    // this.netmaskBits = Math.max( 0, Math.min( 32, parseInt( netmaskBits, 10 ))); /* sanity check: valid values: = 0-32 */
    //
    // this.addressInteger = IPv4_dotquadA_to_intA( this.addressDotQuad );
    // this.addressDotQuad  = IPv4_intA_to_dotquadA( this.addressInteger );
    // this.addressBinStr  = IPv4_intA_to_binstrA( this.addressInteger );
    //
    // this.netmaskBinStr  = IPv4_bitsNM_to_binstrNM( this.netmaskBits );
    // this.netmaskInteger = IPv4_binstrA_to_intA( this.netmaskBinStr );
    // this.netmaskDotQuad  = IPv4_intA_to_dotquadA( this.netmaskInteger );
    //
    // this.netaddressBinStr = IPv4_Calc_netaddrBinStr( this.addressBinStr, this.netmaskBinStr );
    // this.netaddressInteger = IPv4_binstrA_to_intA( this.netaddressBinStr );
    // this.netaddressDotQuad  = IPv4_intA_to_dotquadA( this.netaddressInteger );
    //
    // this.netbcastBinStr = IPv4_Calc_netbcastBinStr( this.addressBinStr, this.netmaskBinStr );
    // this.netbcastInteger = IPv4_binstrA_to_intA( this.netbcastBinStr );
    // this.netbcastDotQuad  = IPv4_intA_to_dotquadA( this.netbcastInteger );


    let addressInteger = IPv4_dotquadA_to_intA( addressDotQuad );
    let addressBinStr  = IPv4_intA_to_binstrA( addressInteger );

    let netmaskBinStr  = IPv4_bitsNM_to_binstrNM( netmaskBits );
    let netmaskInteger = IPv4_binstrA_to_intA( netmaskBinStr );
    let netmaskDotQuad  = IPv4_intA_to_dotquadA( netmaskInteger );

    let netaddressBinStr = IPv4_Calc_netaddrBinStr( addressBinStr, netmaskBinStr );
    let netaddressInteger = IPv4_binstrA_to_intA( netaddressBinStr );
    let netaddressDotQuad  = IPv4_intA_to_dotquadA( netaddressInteger );

    let netbcastBinStr = IPv4_Calc_netbcastBinStr( addressBinStr, netmaskBinStr );
    let netbcastInteger = IPv4_binstrA_to_intA( netbcastBinStr );
    let netbcastDotQuad  = IPv4_intA_to_dotquadA( netbcastInteger );


    // console.log(addressDotQuad.toString());

    console.log(
        addressInteger ,
        addressBinStr,
        netmaskBinStr,
        netmaskInteger,
        netmaskDotQuad,
        netaddressBinStr,
        netaddressInteger,
        netaddressDotQuad,
        netbcastBinStr,
        netbcastInteger,
        netbcastDotQuad
    );

    return {
        'netmask': netmaskDotQuad,
        'network': netaddressDotQuad,
        'broadcast': netbcastDotQuad,
        'hosts': netbcastInteger - netaddressInteger - 1,
        'hostMin': IPv4_intA_to_dotquadA(netaddressInteger+1),
        'hostMax': IPv4_intA_to_dotquadA(netbcastInteger-1)
    }
}

/* In some versions of JavaScript subnet calculators they use bitwise operations to shift the values left. Unfortunately JavaScript converts to a 32-bit signed integer when you mess with bits, which leaves you with the sign + 31 bits. For the first byte this means converting back to an integer results in a negative value for values 128 and higher since the leftmost bit, the sign, becomes 1. Using the 64-bit float allows us to display the integer value to the user. */
/* dotted-quadnumberOfZeros IP to integer */
function IPv4_dotquadA_to_intA( strbits ) {
    let split = strbits.split( '.', 4 );
    let myInt = (
        parseFloat( split[0] * 16777216 )	/* 2^24 */
        + parseFloat( split[1] * 65536 )		/* 2^16 */
        + parseFloat( split[2] * 256 )		/* 2^8  */
        + parseFloat( split[3] )
    );
    return myInt;
}

/* integer IP to dotted-quad */
function IPv4_intA_to_dotquadA( strnum ) {
    let byte1 = ( strnum >>> 24 );
    let byte2 = ( strnum >>> 16 ) & 255;
    let byte3 = ( strnum >>>  8 ) & 255;
    let byte4 = strnum & 255;
    return ( byte1 + '.' + byte2 + '.' + byte3 + '.' + byte4 );
}

/* integer IP to binary string representation */
function IPv4_intA_to_binstrA( strnum ) {
    let numStr = strnum.toString( 2 ); /* Initialize return value as string */
    let numZeros = 32 - numStr.length; /* Calculate no. of zeros */
    if (numZeros > 0) {	for (let i = 1; i <= numZeros; i++) { numStr = "0" + numStr }	}
    return numStr;
}

/* binary string IP to integer representation */
function IPv4_binstrA_to_intA( binstr ) {
    return parseInt( binstr, 2 );
}

/* convert # of bits to a string representation of the binary value */
function IPv4_bitsNM_to_binstrNM( bitsNM ) {
    let bitString = '';
    let numberOfOnes = bitsNM;
    while( numberOfOnes-- ) bitString += '1'; /* fill in ones */
    let numberOfZeros = 32 - bitsNM;
    while( numberOfZeros-- ) bitString += '0'; /* pad remaining with zeros */
    return bitString;
}

/* The IPv4_Calc_* functions operate on string representations of the binary value because I don't trust JavaScript's sign + 31-bit bitwise functions. */
/* logical AND between address & netmask */
function IPv4_Calc_netaddrBinStr( addressBinStr, netmaskBinStr ) {
    let netaddressBinStr = '';
    let aBit = 0; let nmBit = 0;
    for( let pos = 0; pos < 32; pos ++ ) {
        aBit = addressBinStr.substr( pos, 1 );
        nmBit = netmaskBinStr.substr( pos, 1 );
        if( aBit === nmBit ) {	netaddressBinStr += aBit.toString();	}
        else{	netaddressBinStr += '0';	}
    }
    return netaddressBinStr;
}

/* logical OR between address & NOT netmask */
function IPv4_Calc_netbcastBinStr( addressBinStr, netmaskBinStr ) {
    let netbcastBinStr = '';
    let aBit = 0; let nmBit = 0;
    for( let pos = 0; pos < 32; pos ++ ) {
        aBit = parseInt( addressBinStr.substr( pos, 1 ), 10);
        nmBit = parseInt( netmaskBinStr.substr( pos, 1 ), 10);

        if( nmBit ) {	nmBit = 0;	}	/* flip netmask bits */
        else{	nmBit = 1;	}

        if( aBit || nmBit ) {	netbcastBinStr += '1'	}
        else{	netbcastBinStr += '0';	}
    }
    return netbcastBinStr;
}

// /* included as an example alternative for converting 8-bit bytes to an integer in IPv4_dotquadA_to_intA */
// function IPv4_BitShiftLeft( mask, bits ) {
//     return ( mask * Math.pow( 2, bits ) );
// }
//
// /* used for display purposes */
// function IPv4_BinaryDotQuad( binaryString ) {
//     return ( binaryString.substr( 0, 8 ) +'.'+ binaryString.substr( 8, 8 ) +'.'+ binaryString.substr( 16, 8 ) +'.'+ binaryString.substr( 24, 8 ) );
// }
