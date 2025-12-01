export const dynamic = "error";
export const runtime = "edge";

export default function AdminLoginPage() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 text-center">
              <h1 className="h3 mb-3">Panel temporalmente deshabilitado</h1>
              <p className="text-muted mb-0">
                El acceso al panel de administración está en pausa mientras se completan
                las actualizaciones del sitio. Intenta nuevamente más tarde.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
