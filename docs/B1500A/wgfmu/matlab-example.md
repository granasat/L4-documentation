---
title: Matlab remote operation example
position: 3
---

This is a Matlab example showcasing WGFMU remote operation using the provided DLL shared library. To run it, [download the WGFMU DLL](/b1530_matlab_example/wgfmu.dll), and [the C header file](/b1530_matlab_example/wgfmu.h), put them in your working directory or a directory in your path.

:::tip Quickstart
[This compressed file](/b1530_matlab_example.zip) contains everything you need to get started, including the example code.
:::

```matlab
%%

clear all; close all; clc;
loadlibrary('wgfmu', 'wgfmu.h')

CHANNEL1 = libpointer('int32', 101);
CHANNEL2 = libpointer('int32', 102);

nsamples = 10;
samplingTime = 0.05;
AVERAGING_TIME = 10e-6;
WGFMU_MEASURE_EVENT_DATA_AVERAGED = 12000;
WGFMU_OPERATION_MODE_FASTIV = 2001;
WGFMU_MEASURE_MODE_CURRENT = 4001;

clear = calllib('wgfmu', 'WGFMU_clear')

p1 = calllib('wgfmu', 'WGFMU_createPattern', 'v1', 0)
v1 = calllib('wgfmu', 'WGFMU_addVector', 'v1', 1, 0)
m1 = calllib('wgfmu', 'WGFMU_setMeasureEvent', 'v1', 'evt', 0, nsamples, samplingTime, AVERAGING_TIME, WGFMU_MEASURE_EVENT_DATA_AVERAGED)
s1 = calllib('wgfmu', 'WGFMU_addSequence', 101, 'v1', 1)

p2 = calllib('wgfmu', 'WGFMU_createPattern', 'v2', 0)
v2 = calllib('wgfmu', 'WGFMU_addVector', 'v2', 1, 0)
m2 = calllib('wgfmu', 'WGFMU_setMeasureEvent', 'v2', 'evt2', 0, nsamples, samplingTime, AVERAGING_TIME, WGFMU_MEASURE_EVENT_DATA_AVERAGED);
s2 = calllib('wgfmu', 'WGFMU_addSequence', 102, 'v2', 1)

o = calllib('wgfmu', 'WGFMU_openSession', 'b1500gpib')
i = calllib('wgfmu', 'WGFMU_initialize')

%%
om1 = calllib('wgfmu', 'WGFMU_setOperationMode', 101, WGFMU_OPERATION_MODE_FASTIV)
om2 = calllib('wgfmu', 'WGFMU_setOperationMode', 102, WGFMU_OPERATION_MODE_FASTIV)
mmode1 = calllib('wgfmu', 'WGFMU_setMeasureMode', 101, WGFMU_MEASURE_MODE_CURRENT)
mmode2 = calllib('wgfmu', 'WGFMU_setMeasureMode', 102, WGFMU_MEASURE_MODE_CURRENT)

c1 = calllib('wgfmu', 'WGFMU_connect', 101)
c2 = calllib('wgfmu', 'WGFMU_connect', 102)
e = calllib('wgfmu', 'WGFMU_execute')

w = calllib('wgfmu', 'WGFMU_waitUntilCompleted')

%%
measuredSize = libpointer('int32Ptr', 0);
totalSize = libpointer('int32Ptr', 0);


mvsize = calllib('wgfmu', 'WGFMU_getMeasureValueSize', 101, measuredSize, totalSize);

time = zeros(1, measuredSize.Value);
current = zeros(1, measuredSize.Value);
voltage = zeros(1, measuredSize.Value);
for i = 1:measuredSize.Value
    timePtr = libpointer('doublePtr', 0);
    currentPtr = libpointer('doublePtr', 0);
    voltagePtr = libpointer('doublePtr', 0);
    
    calllib('wgfmu', 'WGFMU_getMeasureValue', 101, i-1, timePtr, currentPtr);
    calllib('wgfmu', 'WGFMU_getInterpolatedForceValue', 101, timePtr.Value, voltagePtr);
    
    time(i) = timePtr.Value;
    current(i) = currentPtr.Value;
    voltage(i) = voltagePtr.Value;
end

calllib('wgfmu', 'WGFMU_closeSession')

figure('Name', 'Voltage over time');
plot(time, voltage)
xlabel('Time (s)');
ylabel('Voltage (V)');

figure('Name', 'Current over time');
plot(time, current)
xlabel('Time (s)');
ylabel('Current (A)');


%%

libfunctionsview wgfmu

```