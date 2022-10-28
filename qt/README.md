# Notes

**Component Scope and Property Interfaces**
- Child can directly access parent's properties, even without `parent`, even non-inline
- Declare properties `property <type> <propertyName>` on custom component and such that any usage of the custom component can modify the behavior of the component by passing in different properties (analogous to React props)
  - Properties can also be `readonly`, `required`, or `default`
  - Property can be given default value `<property>: <value>`

**Property Alias**
- Syntax: `[default] property alias <name>: <alias reference>`

**Property Modifier Types**
- Syntax: `<ModifierType> on <Property> { }`
- e.g. `NumberAnimation on x { }`

**Types**
- List: `property list<<objectType>> propertyName` (optionally give it a default value)
- `var` == `any`
- [See all types](https://doc.qt.io/qt-6/qtqml-typesystem-valuetypes.html)

**Anchors**

**Signals**
- Signal == event ; Signal handler == event handler
- `on<Signal>: <Javascript>`
- Types of signals: e.g. property-change-signal `on<Property>Changed`
- Handle signal with parameters: `on<Signal>: <Javascript function>`
- Attached-signal-handler
  - e.g. `ListView.isCurrentItem` that is available to each delegate object in a `
  ` (attaching type is `ListView`)
  - e.g. `Component.onCompleted` (attaching type is `Component`)
  - Notes that the signal-handler is only attached to the root object. `delegateItemId.ListView.isCurrentItem` instead of `ListView.isCurrentItem`
- Declare custom signal/event using `signal <signalName>(<args>)`. Invoking the signal with `<signalName>` will emit the signal/event. Can now declare `on<signalName>` handler on the custom object
- `<signal>.connect(<Javascript function>)` such that the JS functions is automatically invoked everytime the signal is emitted
  - Allow multiple objects to listen to the same signal
  - Allow listen to signal emitted by dynamically created objects
  - `<signal>.disconnect(<Javascript function>)` for disconnecting
  - Signal can connect to other signal

**Property Binding**
- QML engine monitors property dependencies and as property changes its value its dependencies will also update
- Property dependencies described in JS aren't dynamic by default. And JS property dependencies will override Qml property dependencies. `height = Qt.binding(function() { return width * 3 })` instead of `height = width * 3`

**Connection Object**
- Catch signals emitted by the `target` object

**Model, View, Delegate**
- Model: data & its structure
  - Each field = "data role"
- View: display of data e.g. `ListView`, `GridView`
  - Automatic grouping based on value provided by model using `section`
- Delegate: can read data (and can write data). Dictates how data should appear in the view
  - Each item has `index` property
  - Can access view and model respective using `ListView.view` and `ListView.view.model` (attached properties)
  - Can declare required properties on the delegate to make delegate more self-contained and robust

**Enum Attributes**

**Module System**
- [Import statement](https://doc.qt.io/qt-6/qtqml-syntax-imports.html)

**Creating QML Object Dynamically**
- 1st method: with JS `Qt.createQmlObject()`
- 2nd method: with `Qt.createComponent()`

**Component Type**
- Reusable, encapsulated QML types with well-defined interfaces
- Creation context: the scope of component is not inside where it is used but inside where it is declared

**[Loader](https://doc.qt.io/qt-6/qml-qtquick-loader.html)**
- Dynamically load components. Can be used for conditional rendering
- `sourceComponent`, or `source`
- Catch signals emiited by the item inside loader using `Connection` object
- Must set `focus: true` in order for children to get active focus

**[Keyboard Focus](https://doc.qt.io/qt-6/qtquick-input-focus.html)**
- 