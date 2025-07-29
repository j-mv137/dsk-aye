import styles from './table.module.css'

function Table({ className, ...props }: React.ComponentProps<'table'>): React.JSX.Element {
  return (
    <div data-slot="table-container" className={styles.tableContainer}>
      <table data-slot="table" className={`${styles.table} ${className}`} {...props} />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>): React.JSX.Element {
  return (
    <thead data-slot="table-header" className={`${styles.TableHeader} ${className}`} {...props} />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>): React.JSX.Element {
  return <tbody data-slot="table-body" className={`${styles.tableBody} ${className}`} {...props} />
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>): React.JSX.Element {
  return (
    <tfoot data-slot="table-footer" className={`${styles.tableFooter} ${className}`} {...props} />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>): React.JSX.Element {
  return <tr data-slot="table-row" className={`${styles.tableRow} ${className}`} {...props} />
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>): React.JSX.Element {
  return <th data-slot="table-head" className={`${styles.tableHead} ${className}`} {...props} />
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>): React.JSX.Element {
  return <td data-slot="table-cell" className={`${styles.tableCell} ${className}`} {...props} />
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>): React.JSX.Element {
  return <caption data-slot="table-caption" className={`${className}`} {...props} />
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
