# Remotely interfacing the B1500A

The B1500A can be remotely controled using a *VISA* interface. Some form of connection must exist between the B1500A host computer and the remote computer, whether this connection is physically handled by a GPIB cable or an Ethernet network is not relevant.

You must install a VISA driver on your computer, there may be other alternatives that work but, as of now, we have only worked with [Keysight's IO library suite](https://www.keysight.com/es/en/lib/software-detail/computer-software/io-libraries-suite-downloads-2175637.html), we strongly advise choosing this.

Assuming you have installed [Keysight's IO library suite](https://www.keysight.com/es/en/lib/software-detail/computer-software/io-libraries-suite-downloads-2175637.html) (if not you are now on your own) a programm named Keysight Connection Expert must have been installed on your computer. This is the GUI we will use to tell the driver wich VISA enabled equipment is connected to our machine, down below you can see a picture of this interface with an already added remote instrument.

<div className="flex justify-center w-100">
    <a target="\_blank" href={require("./assets/connection_expert.png").default}>
        <img
            className="w-12/12 md:max-w-xl"
            alt="Keysight Connection Expert"
            src={require("./assets/connection_expert.png").default}>
        </img>
    </a>
</div>



In order to add a new instrument to your setup, click on the **+ Add** button on the left panel, select the type of device and fill in the connection details.

## Ethernet device

In order to interface the B1500A device through ethernet, click the **+ Add** button on the left side of Keysight connection expert, you will see a configuration menu like the one shown below:

<div className="flex justify-center w-100">
    <a target="\_blank" href={require("./assets/connection_expert_remote_usb.png").default}>
        <img
            className="w-12/12 md:max-w-xl"
            alt="B1500A Ethernet"
            src={require("./assets/connection_expert_remote_usb.png").default}>
        </img>
    </a>
</div>

:::danger EasyEXPERT

Ethernet VISA connection **WONT** work if EasyEXPERT programm is open on the B1500A. Not even the first dialog with the *Start EasyEXPERT* button, *MUST BE FULLY CLOSED* or else you will not be able to interface through ethernet.

:::

Once *Connection Expert* shows the device as initialized you should be able to use the standard *VISA* address shown in the program to interface the B1500A through ethernet, however, the *VISA* address for a ethernet device is cumbersome and contains non common characters that some libraries do not work well with, this is why we recommend to set up an alias, that way you can specify a simple name wich you can instead (replacing the *VISA* address) in your programm. Down below a configuration example for the device is shown.

<div className="flex justify-center w-100">
    <a target="\_blank" href={require("./assets/connection_expert_alias.png").default}>
        <img
            className="w-12/12 md:max-w-xl"
            alt="B1500A Ethernet"
            src={require("./assets/connection_expert_alias.png").default}>
        </img>
    </a>
</div>