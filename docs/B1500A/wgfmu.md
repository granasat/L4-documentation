# Fast Measurement Unit

The B1500A in L4 laboratory is equipped with Keysight's B1530A fast measuring unit or WGFMU for short. This is a special SMU which can generate arbitrary linear waveforms on its own. It is useful when *speed* is critical in the measurements.

Although the device can be remotely controlled by means of a *VISA* interface using custom commands, Keysight does not expose the device's API. It instead offers this [propietary Windows only libray](https://www.keysight.com/es/en/lib/software-detail/driver/b1530a-wgfmu-instrument-library--sample-programs-2117445.html) which, combined with [Keysight's IO library suite](https://www.keysight.com/es/en/lib/software-detail/computer-software/io-libraries-suite-downloads-2175637.html) can remotely interface the WGFMU.

:::danger Compliance current

The WGFMU module does not have a compliance current (limit current) feature. Current output is limited to 10 mA (experimentally we have observed around 11 mA).

:::

:::tip On the generation of arbitrary waveforms

Regular SMU's (MPSMU's in our case) are able to generate arbitray waveform shapes but are not able to provide time guarantees in that regard. One can send ***DV*** commands to the remote control server of a B1500A to force a voltage output but it is not guaranteed how much the SMU will take to firstly force the output and second to perform the measurement.

:::

# Getting started from scratch

As of now, the command computer (this is the computer from which you intend to control the B1530A) needs to be running Windows (maybe Wine or using a VM would work but we have not tried), as the provided library is in the form of a DLL.

#### Setting up communications

First of all connect the B1500A to the computer, either using GPIB, ethernet or any other method, refer to [this previous guide](./visa.md) for a detail explanation about interfacing the B1500A through a PC. It is really important that you set up an alias for the *VISA* device, the B1530A library does not behave well with remote devices, again refer to [the previous guide](./visa.md) for detail instructions.

#### Installing remote control library

Once you have setup your connections and everything is working, install [Keysights's B1530A remote control library](https://www.keysight.com/es/en/lib/software-detail/driver/b1530a-wgfmu-instrument-library--sample-programs-2117445.html). 

#### Creating a project

This example will show how to create a Visual Studio project, if Visual Studio is not installed, please refer to [this link](https://visualstudio.microsoft.com/) and install Visual Studio Community Edition (NOT Visual Studio Code, that is only a text editor, not an IDE). When you open the installer it will at some point prompt you to select the types of applications you want to develop, .NET, C#, etc. for this example you just need the C++ applications packages, Windows SDK is mandatory.

Once Visual Studio is finished installing (it will take a while), open it and create a new project, you will be prompted to select a project type, select C++ console application, as shown in the image below:

<div className="flex justify-center w-100">
    <a target="\_blank" href={require("./assets/visual_studio_create_console_project.png").default}>
    <img
        alt="C++ console application"
        className="w-12/12 md:max-w-xl"
        src={require("./assets/visual_studio_create_console_project.png").default}>
    </img>
    </a>
</div>


You will now need to configure the project, in order for it to find necessary libraries. Click to open project properties as shown in the image below:

<div className="flex justify-center w-100">
    <a target="\_blank" href={require("./assets/visual_studio_project_properties.png").default}>
    <img
        alt="Visual studio project properties"
        className="w-12/12 md:max-w-xl"
        src={require("./assets/visual_studio_project_properties.png").default}>
    </img>
    </a>
</div>

Now click con the **General** tab of **C/C++** properties and **Additional library directories**, and add these two paths:

- ```C:\Program Files (x86)\IVI Foundation\VISA\WinNT\ktvisa\include```
- ```C:\Program Files\Agilent\B1530A\include```

If you have installed the **VISA** and B1530A library in custom paths, change them as needed.

Lastly, click on the **General** tab of **Linker** properties and, again, configure **Additional library directories**, add these two paths:

- ```C:\Program Files (x86)\IVI Foundation\VISA\WinNT\ktvisa\Lib_x64\msc ```
- ```C:\Program Files\Agilent\B1530A\Lib_x64 ```

Again, if you installed either **VISA** or the B1530A library on different paths adjust them as needed. Down below two pictures show how the setup should end up looking like.

<div className="flex justify-center w-100 flex-wrap md:flex-nowrap">
    <a className="px-2" target="\_blank" href={require("./assets/visual_studio_c_paths.png").default}>
        <img
            alt="Visual studio project C library paths"
            className="object-contain"
            src={require("./assets/visual_studio_c_paths.png").default}>
        </img>
    </a>
    <a className="px-2" target="\_blank" href={require("./assets/visual_studio_linker_paths.png").default}>
    
        <img
            alt="Visual studio project linker library paths"
            className="object-contain"
            src={require("./assets/visual_studio_linker_paths.png").default}>
        </img>
    </a>

</div>