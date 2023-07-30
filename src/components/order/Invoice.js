import React from 'react';
import {Document, Page, Text, View, Image, Font, StyleSheet} from "@react-pdf/renderer";
import {Table, TableHeader, TableCell, TableBody, DataTableCell} from "@david.kucsai/react-pdf-table";

const source1 = `/fonts/Rubik-Bold.ttf`
const source2 = `/fonts/Rubik-Regular.ttf`


Font.register({
    family: 'Rubik',
    fonts: [
        {
            src: source1,
            fontWeight: 700
        },
        {
            src: source2,
            fontWeight: 400

        },
    ],
});

const styles = StyleSheet.create({
    body: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingHorizontal: 15,
        fontFamily: 'Rubik',

    },
    subtitle: {
        fontSize: 12,
        marginTop: 20,
        marginBottom: 5,
        color: '#131921',
        textAlign: 'left',
        fontFamily: 'Rubik',
        fontWeight: '700',
    },
    invoiceNo: {
        fontSize: 15,
        marginBottom: 5,
        color: '#131921',
        textAlign: 'left',
        fontWeight: '700',
        fontFamily: 'Rubik',
    },
    siteTitle: {
        fontSize: 15,
        marginBottom: 15,
          color:'#131921',
        fontWeight: '700',
        fontFamily: 'Rubik',
    },
    payMentInfo: {
        marginTop: 15,
        textAlign: 'right',
        fontFamily: 'Rubik',
    },
    text: {
        fontSize: 12,
        marginTop: 15,
        fontFamily: 'Rubik',
    },
    image: {
        height: 60,
        width: 60,
        objectFit: 'contain',
    },
    footer: {
        padding: "50px",
        fontSize: 10,
        textAlign: "center",
        color: "#232f3e",
        fontFamily: 'Rubik',
    },
    invoiceDetails: {
        fontSize: 9,
        color: "#1c1c1b",
        marginBottom: 5,
        fontFamily: 'Rubik',
    },
    mpesaDetails: {
        fontSize: 9,
        color: "#1c1c1b",
        marginBottom: 10,
        fontFamily: 'Rubik',
    },
    payPalDetails: {
        fontSize: 9,
        color: "#1c1c1b",
        marginBottom: 10,
        fontFamily: 'Rubik',
    },
    stripeDetails: {
        marginBottom: 10,
        fontFamily: 'Rubik',
    },
    invoiceDetailsCard: {
        padding: '8px 5px',
        backgroundColor: '#f5f8f2',
        margin: '5px -5px',
        fontFamily: 'Rubik',
    },
    ribbon: {
        padding: "7px 70px", // Reduce right-left padding
        color: " #FFF",
        position: "absolute",
        top: 0,
        right: "-40px", // Adjust positioning as needed
        transform: "rotate(35deg)",
        border: "1px dashed #FFF",
        boxShadow: "0 0 0 3px #EA4335",
        margin: "10px",
        fontFamily: 'Rubik',
    },
    paidRibbon: {
        backgroundColor: 'green',

    },
    ribbonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        margin: '0px 10px',
        fontFamily: 'Rubik',
        fontWeight: 700
    },
    table: {
        marginTop: 10,
        fontFamily: 'Rubik',
    },
    tableHeader: {
        backgroundColor: '#f2f2f2',
        fontFamily: 'Rubik',
    },
    tableRow: {
        backgroundColor: '#f3f5fa',
        fontFamily: 'Rubik',
    },
    tableCell: {
        padding: 5,
        fontSize: 9,
        fontFamily: 'Rubik',
    },
    transactionTable: {
        marginTop: 15,
        fontFamily: 'Rubik',
    },
    transactionHeader: {
        backgroundColor: '#f2f2f2',
        fontFamily: 'Rubik',
    },
    transactionRow: {
        backgroundColor: '#f3f5fa',
        fontFamily: 'Rubik',
    },
    transactionCell: {
        padding: 5,
        fontSize: 9,
        fontFamily: 'Rubik',
    }, transactionCellHeader: {
        padding: 5,
        fontSize: 9,
        fontFamily: 'Rubik',
        fontWeight: 700
    },

    meta: {
        marginBottom: 10,
        fontSize: 9,
        fontFamily: 'Rubik',
    }
});


const TransactionTable = ({transactions}) => (
    <Table style={styles.transactionTable} data={transactions}>
        <TableHeader style={styles.transactionHeader}>
            <TableCell style={styles.transactionCellHeader}>Transaction Date</TableCell>
            <TableCell style={styles.transactionCellHeader}>Gateway</TableCell>
            <TableCell style={styles.transactionCellHeader}>Transaction ID</TableCell>
            <TableCell style={styles.transactionCellHeader}>Amount</TableCell>
        </TableHeader>
        <TableBody>
            <DataTableCell style={[styles.transactionCell, styles.transactionRow]} getContent={x => x.date}/>
            <DataTableCell style={[styles.transactionCell, styles.transactionRow]} getContent={x => x.gateway}/>
            <DataTableCell style={[styles.transactionCell, styles.transactionRow]} getContent={x => x.transactionId}/>
            <DataTableCell style={[styles.transactionCell, styles.transactionRow]} getContent={x => x.amount}/>
        </TableBody>
    </Table>
);


const transactions = [
    // Replace with your transaction data

    {
        date: '2023-07-02',
        gateway: 'MPESA',
        transactionId: 'DEF456',
        amount: '$75.50',
    },
    // Add more transactions as needed
];
const Ribbon = ({paymentStatus}) => (
    <View style={[styles.ribbon, ['COMPLETED', 'Success', 'succeeded'].includes(paymentStatus) && styles.paidRibbon]}>
        <Text style={styles.ribbonText}>
            {['COMPLETED', 'Success', 'succeeded'].includes(paymentStatus) ? 'PAID' : 'UNPAID'}
        </Text>
    </View>
);
const Invoice = ({order}) => {
    console.log(order)
    if (!order || !order.products) {
        return <Text>Loading...</Text>;
    }

    return (
        <Document>
            <Page style={styles.body}>
                <Image
                    style={styles.image}
                    src="/logo512.png" // replace logoURL with your logo URL
                />
                <Ribbon paymentStatus={order.paymentStatus}/>
                <View style={styles.payMentInfo}>
                    <Text style={styles.siteTitle}>{process.env.REACT_APP_APPNAME}</Text>
                    <Text style={styles.mpesaDetails}>MPESA TILL NO: {process.env.REACT_APP_TILL}</Text>
                    <Text style={styles.payPalDetails}>Paypal: {process.env.REACT_APP_PAYPAL}</Text>
                    <View style={styles.stripeDetails}>
                        <Text style={styles.invoiceDetails}>Bank Name: {process.env.REACT_APP_BANK_NAME}</Text>
                        <Text style={styles.invoiceDetails}>Account Name: {process.env.REACT_APP_ACCOUNT_NAME}</Text>
                        <Text style={styles.invoiceDetails}>Account
                            Number: {process.env.REACT_APP_ACCOUNT_NUMBER}</Text>
                        <Text style={styles.invoiceDetails}>Branch: {process.env.REACT_APP_BRANCH}</Text>
                    </View>
                </View>


                <View style={styles.invoiceDetailsCard}>
                    <Text style={styles.invoiceNo}>Invoice #278642</Text>
                    <Text style={styles.invoiceDetails}>Invoice Date: 7th April 2023</Text>
                    <Text style={styles.invoiceDetails}>Due Date: 6th June 2023</Text>
                </View>
                <Text style={styles.subtitle}>Invoiced To</Text>
                <Text style={styles.invoiceDetails}>Tai lifestyle</Text>
                <Text style={styles.invoiceDetails}>ATTN: Tai Lifestyle</Text>
                <Text style={styles.invoiceDetails}>89990</Text>
                <Text style={styles.invoiceDetails}>Mombasa, null, 80100</Text>
                <Text style={styles.invoiceDetails}>Kenya</Text>

                <Table style={styles.table} data={order.products}>
                    <TableHeader style={styles.tableHeader}>
                        <TableCell style={styles.transactionCellHeader}>Title</TableCell>
                        <TableCell style={styles.transactionCellHeader}>Price</TableCell>
                        <TableCell style={styles.transactionCellHeader}>Quantity</TableCell>
                        <TableCell style={styles.transactionCellHeader}>Brand</TableCell>
                        <TableCell style={styles.transactionCellHeader}>Color</TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell style={[styles.tableCell, styles.tableRow]} getContent={x => x.product.title}/>
                        <DataTableCell style={[styles.tableCell, styles.tableRow]}
                                       getContent={x => `KES ${x.product.price}`}/>
                        <DataTableCell style={[styles.tableCell, styles.tableRow]} getContent={x => x.count}/>
                        <DataTableCell style={[styles.tableCell, styles.tableRow]}
                                       getContent={x => x.product.brand.name}/>
                        <DataTableCell style={[styles.tableCell, styles.tableRow]} getContent={x => x.product.color}/>
                    </TableBody>
                </Table>

                <Text style={styles.subtitle}>Transactions</Text>
                <TransactionTable transactions={transactions}/>


                <View style={styles.text}>
                    <Text style={styles.invoiceDetails}>Date: {new Date(order.orderDate).toLocaleString()}</Text>
                    <Text style={styles.invoiceDetails}>Order Number: {order.orderId}</Text>
                    <Text style={styles.invoiceDetails}>Order Status: {order.orderStatus}</Text>
                    <Text style={styles.invoiceDetails}>Payment status: {order.paymentStatus}</Text>
                    <Text style={styles.invoiceDetails}>Payment method: {order.paymentMethod}</Text>
                    <Text style={styles.invoiceDetails}>Shipping Status: {order.shippingStatus}</Text>
                    <Text style={styles.invoiceDetails}>Total paid: {(order.amount).toLocaleString('en-US', {
                        style: 'currency', currency: `${order.currencyCode === 'USD' ? 'USD' : 'KSH'}`
                    })}
                    </Text>
                </View>


                <Text style={styles.footer}>
                    ~Thank you for shopping with us~
                </Text>
            </Page>
        </Document>
    );
};

export default Invoice;
