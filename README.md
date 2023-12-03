# Implementing Loading Functionality in App Layout

In the given code, the implementation of loading functionality is described to display a loading spinner when accessing certain routes, such as the 'Menu' route, while waiting for data to be fetched. This process is detailed as follows:

## 1. Checking Application State Using `useNavigation()` Hook

- To ensure the application is in the right state for displaying a loading spinner, it needs to check if it is currently idle, loading, or submitting.
- This information can be obtained using the `useNavigation()` hook. The state retrieved from this hook pertains to the entire application, not just a specific page.
- When one of the pages is in the loading process, the navigation state becomes 'loading.'

## 2. Creating a Generic Loader

- It's explained that creating a loading indicator specifically for fetching menu items doesn't make sense. Instead, a generic loader will be created in the `<AppLayout/>` component.
- The `useNavigation()` hook is used to access the navigation state, and it's logged to the console to verify the state changes.
- When clicking the 'Menu' button, the state changes from 'idle' to 'loading' as the page starts loading, and it returns to 'idle' when the page loading is complete.

## 3. Displaying the Loader Conditionally

- With the information obtained from the navigation state, a variable named `isLoading` is created to indicate whether the application is in a loading state.
- A `<Loader/>` component is added to the `<AppLayout/>`, which will be displayed conditionally when `isLoading` is true.
- The `<Loader/>` component serves as a loading indicator and overlays the entire page while data is being fetched.

This implementation ensures that a loading spinner is displayed when the application is in a loading state, enhancing the user experience by providing visual feedback during data retrieval, as demonstrated when fetching pizza data on the 'Menu' page.
